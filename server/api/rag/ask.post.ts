
import { createError, readBody } from 'h3'
import { GoogleGenAI } from '@google/genai'
import { QdrantClient } from '@qdrant/js-client-rest'

export default defineEventHandler(async (event) => {
  const { question } = await readBody<{ question?: string }>(event)

  if (!question?.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Please enter a question.'
    })
  }

  const apiKey = process.env.GEMINI_API_KEY
  const qdrantUrl = process.env.QDRANT_URL
  const qdrantApiKey = process.env.QDRANT_API_KEY
  const collectionName =
    process.env.QDRANT_COLLECTION_NAME || 'marketing_knowledge'

  const embeddingModel =
    process.env.GEMINI_EMBEDDING_MODEL || 'gemini-embedding-001'

  const embeddingDimensions = Number(
    process.env.GEMINI_EMBEDDING_DIMENSIONS || 768
  )

  if (!apiKey || !qdrantUrl || !qdrantApiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Gemini or Qdrant configuration is missing.'
    })
  }

  const genAI = new GoogleGenAI({ apiKey })
  const qdrant = new QdrantClient({
    url: qdrantUrl,
    apiKey: qdrantApiKey
  })

  try {
    // 1. Convert the user's question into a vector
    const embedding = await genAI.models.embedContent({
      model: embeddingModel,
      contents: question.trim(),
      config: {
        taskType: 'RETRIEVAL_QUERY',
        outputDimensionality: embeddingDimensions
      }
    })

    const vector = embedding.embeddings?.[0]?.values

    if (!vector || vector.length !== embeddingDimensions) {
      throw new Error('Question embedding dimensions do not match.')
    }

    // 2. Search Qdrant for relevant document chunks
    const searchResult = await qdrant.query(collectionName, {
      query: vector,
      limit: 5,
      with_payload: true
    })

    const context = searchResult.points
      .map((point) => {
        const payload = point.payload as {
          text?: string
          source?: string
        } | null

        return payload?.text
          ? `Source: ${payload.source || 'Uploaded document'}\n${payload.text}`
          : ''
      })
      .filter(Boolean)
      .join('\n\n---\n\n')

    if (!context) {
      return {
        answer: 'I could not find relevant information. Please upload a document first.',
        sources: []
      }
    }

    // 3. Ask Gemini to answer using retrieved context
    const response = await genAI.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: `
Answer the user's question using the provided document context.
If the context does not contain the answer, clearly say you cannot
find the answer in the uploaded document. Do not invent facts.

DOCUMENT CONTEXT:
${context}

USER QUESTION:
${question.trim()}
`
    })

    return {
      answer: response.text || 'Gemini did not return an answer.',
      sources: searchResult.points
        .map((point) => {
          const payload = point.payload as {
            source?: string
            chunkIndex?: number
          } | null

          return payload
            ? {
                filename: payload.source,
                chunkIndex: payload.chunkIndex
              }
            : null
        })
        .filter(Boolean)
    }
  } catch (error) {
    console.error('RAG question failed:', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to answer question. Check the Nuxt terminal.'
    })
  }
})
