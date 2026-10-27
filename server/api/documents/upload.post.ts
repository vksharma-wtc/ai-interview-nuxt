
import { createError, readMultipartFormData } from 'h3'
import { GoogleGenAI } from '@google/genai'
import { QdrantClient } from '@qdrant/js-client-rest'
import { randomUUID } from 'node:crypto'

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2 MB
const CHUNK_SIZE = 1000
const CHUNK_OVERLAP = 150

function splitIntoChunks(text: string): string[] {
  const chunks: string[] = []
  let start = 0

  while (start < text.length) {
    const end = Math.min(start + CHUNK_SIZE, text.length)
    const chunk = text.slice(start, end).trim()

    if (chunk) {
      chunks.push(chunk)
    }

    if (end === text.length) break

    start = end - CHUNK_OVERLAP
  }

  return chunks
}

export default defineEventHandler(async (event) => {

    console.log('UPLOAD API HIT')
    console.log('UPLOAD STEP 1: Handler started')
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
  console.log('UPLOAD STEP 3: Gemini succeeded')

  if (!apiKey || !qdrantUrl || !qdrantApiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Gemini or Qdrant environment variables are missing.'
    })
  }

  const parts = await readMultipartFormData(event)

  if (!parts?.length) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Please upload a document.'
    })
  }

  const file = parts.find(
    part => part.name === 'file' && part.filename
  )

  if (!file?.data || !file.filename) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No file was received.'
    })
  }

  if (file.data.length > MAX_FILE_SIZE) {
    throw createError({
      statusCode: 413,
      statusMessage: 'File size must not exceed 2 MB.'
    })
  }

  const extension = file.filename.split('.').pop()?.toLowerCase()

  if (!['txt', 'md'].includes(extension || '')) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Only TXT and MD files are supported currently.'
    })
  }

  const text = file.data.toString('utf8')
    .replace(/\u0000/g, '')
    .trim()

  if (!text) {
    throw createError({
      statusCode: 400,
      statusMessage: 'The uploaded document is empty.'
    })
  }

  const chunks = splitIntoChunks(text)

  if (chunks.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No readable text was found in the document.'
    })
  }

  const genAI = new GoogleGenAI({ apiKey })

  const qdrant = new QdrantClient({
    url: qdrantUrl,
    apiKey: qdrantApiKey
  })

  try {
    const points = []

    for (let index = 0; index < chunks.length; index++) {
      const response = await genAI.models.embedContent({
        model: embeddingModel,
        contents: chunks[index],
        config: {
          taskType: 'RETRIEVAL_DOCUMENT',
          outputDimensionality: embeddingDimensions
        }
      })

      const vector = response.embeddings?.[0]?.values

      if (!vector || vector.length !== embeddingDimensions) {
        throw new Error(
          `Embedding dimension mismatch for chunk ${index}. ` +
          `Expected ${embeddingDimensions}, received ${vector?.length ?? 0}.`
        )
      }

      points.push({
        id: randomUUID(),
        vector,
        payload: {
          text: chunks[index],
          source: file.filename,
          chunkIndex: index,
          uploadedAt: new Date().toISOString()
        }
      })
    }

    // console.log('Qdrant URL:', qdrantUrl)
    // console.log('Collection name:', collectionName)
    // console.log('Embedding dimensions:', embeddingDimensions)
    // console.log('Points to save:', points.length)

    await qdrant.upsert(collectionName, {
      wait: true,
      points
    })

    return {
      success: true,
      message: 'Document uploaded and indexed successfully.',
      filename: file.filename,
      chunksCreated: chunks.length
    }
  } catch (error: unknown) {
  console.error('RAG document indexing failed:', error)

  if (error instanceof Error) {
    console.error('Error message:', error.message)
    console.error('Error stack:', error.stack)
  }

  throw createError({
    statusCode: 500,
    statusMessage:
      error instanceof Error
        ? error.message
        : 'Unknown error while indexing document'
  })
}
})
