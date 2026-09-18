// server/api/interview/evaluate.ts (or your API file)
import { GoogleGenAI, Type } from '@google/genai'

const ai = new GoogleGenAI()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.question || !body.answer) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Question and answer are required'
    })
  }

  try {
    const response = await ai.models.generateContent({
      // Change model to gemini-3.5-flash-lite
      model: 'gemini-3.5-flash-lite', 
      contents: `
You are an expert technical interviewer evaluating a candidate's answer.

Question: ${body.question}
Candidate Answer: ${body.answer}

Evaluate the response objectively.
- Return a score from 0 to 10.
- If the candidate's answer consists of random gibberish or a non-answer, set score to 0 and strengths to an empty array.
- Provide general summary feedback.
- List specific strengths and improvements.
      `,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: {
              type: Type.INTEGER,
              description: 'Score out of 10'
            },
            feedback: {
              type: Type.STRING,
              description: 'General evaluation summary'
            },
            strengths: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'List of specific strengths'
            },
            improvements: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'List of points to improve'
            }
          },
          required: ['score', 'feedback', 'strengths', 'improvements']
        }
      }
    })

    if (response.text) {
      return JSON.parse(response.text)
    }

    throw new Error('No evaluation response received from model')

  } catch (error: any) {
    console.error('Gemini API Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Failed to evaluate answer'
    })
  }
})