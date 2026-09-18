// composables/useInterview.ts
export const useInterview = () => {
  // Shared session state accessed by both interview.vue and result.vue
  const session = useState('interviewSession', () => ({
    duration: '00:00',
    evaluations: []
  }))

  const questions = ref([
    { id: 1, question: 'Tell me about yourself and your experience as a software developer.' },
    { id: 2, question: 'What is the difference between REST API and GraphQL?' },
    { id: 3, question: 'How do you handle asynchronous state management in Vue or React?' },
    { id: 4, question: 'Describe a challenging technical bug you encountered and how you resolved it.' },
    { id: 5, question: 'What steps do you take to optimize the performance of a web application?' }
  ])

  const currentQuestion = ref(0)
  const answer = ref('')
  const evaluation = ref(null)
  const isEvaluating = ref(false)

  const question = computed(() => questions.value[currentQuestion.value])
  const progress = computed(() => Math.round(((currentQuestion.value + 1) / questions.value.length) * 100))
  const isFinished = computed(() => currentQuestion.value >= questions.value.length - 1)

  const submitAnswer = async () => {
    if (!answer.value.trim() || isEvaluating.value) return

    isEvaluating.value = true

    try {
      // 1. Call your Nuxt API endpoint
      const response = await $fetch('/api/interview/evaluate', {
        method: 'POST',
        body: {
          question: question.value.question,
          answer: answer.value
        }
      })

      evaluation.value = response

      // 2. Append this evaluation into the shared session state
      session.value.evaluations.push({
        id: question.value.id || Date.now(),
        question: question.value.question,
        answer: answer.value,
        score: response.score,
        feedback: response.feedback,
        strengths: response.strengths || [],
        improvements: response.improvements || []
      })
    } catch (err) {
      console.error('Failed to submit answer:', err)
    } finally {
      isEvaluating.value = false
    }
  }

  const nextQuestion = () => {
    if (!isFinished.value) {
      currentQuestion.value++
      answer.value = ''
      evaluation.value = null
    }
  }

  return {
    session,
    currentQuestion,
    question,
    answer,
    evaluation,
    isEvaluating,
    isFinished,
    progress,
    submitAnswer,
    nextQuestion
  }
}