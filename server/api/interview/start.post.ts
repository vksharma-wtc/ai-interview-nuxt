export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const answer = body.answer

  if (!answer) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Answer is required',
    })
  }

  return {
    score: 7,
    feedback:
      'Good answer. You explained the concept clearly, but you could provide a practical example.',
    strengths: [
      'Clear explanation',
      'Good technical understanding',
    ],
    improvements: [
      'Add a real-world example',
      'Explain the trade-offs',
    ],
  }
})