const currentQuestion = ref(0)

const answer = ref('')

const evaluation = ref(null)

const isEvaluating = ref(false)

export const interviewQuestions = [
  {
    id: 1,
    question: 'Tell me about yourself and your experience as a software developer.',
  },
  {
    id: 2,
    question: 'What is the difference between REST API and GraphQL?',
  },
  {
    id: 3,
    question: 'Explain how you would design a scalable e-commerce application.',
  },
  {
    id: 4,
    question: 'What is caching and where would you use Redis?',
  },
  {
    id: 5,
    question: 'How would you troubleshoot a slow API?',
  },
]

async function submitAnswer() {
  if (!answer.value.trim()) return

  isEvaluating.value = true

  try {
    evaluation.value = await $fetch('/api/interview/evaluate', {
      method: 'POST',
      body: {
        answer: answer.value,
      },
    })
  } finally {
    isEvaluating.value = false
  }
}
