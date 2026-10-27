import { GoogleGenAI } from '@google/genai'
import { QdrantClient } from '@qdrant/js-client-rest'

export default defineEventHandler(async () => {
  const apiKey = process.env.GEMINI_API_KEY
  const qdrantUrl = process.env.QDRANT_URL
  const qdrantApiKey = process.env.QDRANT_API_KEY
  const collection =
    process.env.QDRANT_COLLECTION_NAME || 'marketing_knowledge'

  const checks: Record<string, string> = {
    geminiKey: apiKey ? 'configured' : 'missing',
    qdrantUrl: qdrantUrl ? 'configured' : 'missing',
    qdrantKey: qdrantApiKey ? 'configured' : 'missing'
  }

  if (!apiKey || !qdrantUrl || !qdrantApiKey) {
    return { success: false, checks }
  }

  try {
    const qdrant = new QdrantClient({
      url: qdrantUrl,
      apiKey: qdrantApiKey
    })

    const result = await qdrant.getCollection(collection)

    checks.qdrantCollection = 'accessible'
    checks.vectorSize = String(
      (result.config.params.vectors as { size?: number }).size ?? 'unknown'
    )
  } catch (error) {
    console.error('Qdrant health check failed:', error)
    checks.qdrantCollection = 'failed; check server logs'
  }

  return { success: true, checks }
})