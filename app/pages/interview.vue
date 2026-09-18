<script setup lang="ts">
const {
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
} = useInterview()

const elapsedSeconds = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

const formattedTime = computed(() => {
  const minutes = Math.floor(elapsedSeconds.value / 60)
  const seconds = elapsedSeconds.value % 60

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
})

onMounted(() => {
  // Clear any existing session evaluations when starting a new interview
  session.value.evaluations = []

  timer = setInterval(() => {
    elapsedSeconds.value++
  }, 1000)
})

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
  }
})

const handleNextQuestion = () => {
   stopRecording()

  finalTranscript.value = ''
  answer.value = ''
  nextQuestion()
}

const finishInterview = () => {
  // Save overall duration to the shared session state
  session.value.duration = formattedTime.value
  navigateTo('/result')
}



// Recording code

const isRecording = ref(false)
const recognition = ref<any>(null)

// Stores everything spoken across recognition sessions
const finalTranscript = ref('')

// Prevent automatic restart after user manually stops
const manuallyStopped = ref(false)

const toggleRecording = () => {
  if (isRecording.value) {
    stopRecording()
  } else {
    startRecording()
  }
}

const startRecording = () => {
  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition

  if (!SpeechRecognition) {
    alert('Speech recognition is not supported in this browser.')
    return
  }

  manuallyStopped.value = false

  recognition.value = new SpeechRecognition()

  recognition.value.continuous = true
  recognition.value.interimResults = true
  recognition.value.lang = 'en-US'

  recognition.value.onstart = () => {
    isRecording.value = true
  }

  recognition.value.onresult = (event: any) => {
    let interimTranscript = ''

    for (
      let i = event.resultIndex;
      i < event.results.length;
      i++
    ) {
      const transcript = event.results[i][0].transcript

      if (event.results[i].isFinal) {
        // Save permanent speech
        finalTranscript.value += transcript + ' '
      } else {
        // Temporary speech while user is speaking
        interimTranscript += transcript
      }
    }

    // Show previous speech + current speech
    answer.value =
      finalTranscript.value + interimTranscript
  }

  recognition.value.onerror = (event: any) => {
    console.error(
      'Speech recognition error:',
      event.error
    )

    // Don't stop automatically for normal speech pauses
    if (
      event.error === 'no-speech' ||
      event.error === 'aborted'
    ) {
      return
    }

    isRecording.value = false
  }

  recognition.value.onend = () => {
    isRecording.value = false

    // Browser can automatically end recognition after a pause.
    // Restart it while the user still wants to record.
    if (!manuallyStopped.value) {
      setTimeout(() => {
        if (!manuallyStopped.value) {
          try {
            recognition.value.start()
          } catch (error) {
            console.log('Recognition restart skipped:', error)
          }
        }
      }, 300)
    }
  }

  try {
    recognition.value.start()
  } catch (error) {
    console.error('Could not start speech recognition:', error)
  }
}

const stopRecording = () => {
  manuallyStopped.value = true

  if (recognition.value) {
    recognition.value.stop()
  }

  isRecording.value = false
}
</script>

<template>
  <div class="interview-page">

    <!-- Header -->
    <header class="interview-header">
      <div class="header-inner">

        <NuxtLink to="/" class="logo">
          AI Interviewer
        </NuxtLink>

        <div class="header-right">
          <div class="timer">
            <span class="timer-icon">⏱</span>
            {{ formattedTime }}
          </div>

          <NuxtLink to="/" class="exit-btn">
            Exit
          </NuxtLink>
        </div>

      </div>
    </header>

    <!-- Main -->
    <main class="interview-container">

      <!-- Progress -->
      <section class="progress-section">

        <div class="progress-top">
          <span>
            Question {{ currentQuestion + 1 }}
            of 5
          </span>

          <span>
            {{ progress }}%
          </span>
        </div>

        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>

      </section>

      <!-- Interview Area -->
      <section class="interview-grid">

        <!-- AI Interviewer -->
        <div class="ai-card">

          <div class="ai-avatar">
            <div class="avatar-face">
              🤖
            </div>

            <div class="speaking-indicator">
              AI Interviewer
            </div>
          </div>

          <div class="ai-info">
            <h3>AI Interviewer</h3>

            <p>
              Take your time and provide your best answer.
            </p>
          </div>

        </div>

        <!-- Question -->
        <div class="question-card">

          <div class="question-label">
            TECHNICAL INTERVIEW
          </div>

          <h1>
            {{ question?.question }}
          </h1>

          <div class="question-hint">
            <span>💡</span>
            Explain your answer clearly and provide examples
            where possible.
          </div>

        </div>

      </section>

      <!-- Answer -->
      <section class="answer-section">

        <div class="answer-header">
          <h2>Your Answer</h2>

          <span class="answer-status">
            {{ answer.length }} characters
          </span>
        </div>

        <textarea
          v-model="answer"
          class="answer-input"
          placeholder="Type your answer here..."
          :disabled="!!evaluation || isEvaluating"
        ></textarea>

        <!-- Voice button -->
        <div class="voice-section">

          <button
            @click="toggleRecording"
            :class="isRecording
              ? 'bg-red-500 text-white'
              : 'bg-white text-blue-600'"
            class="px-6 py-3 rounded-lg border"
          >
            🎙
            {{ isRecording ? 'Stop Recording' : 'Speak Answer' }}
          </button>

          <span class="voice-info">
            Voice input will be connected in the next step.
          </span>

        </div>

        <!-- Evaluation -->
        <div
          v-if="evaluation"
          class="evaluation-card"
        >

          <div class="evaluation-header">
            <div>
              <span class="evaluation-label">
                AI EVALUATION
              </span>

              <h2>
                Your Score
              </h2>
            </div>

            <div class="score">
              {{ evaluation.score }}
              <span>/10</span>
            </div>
          </div>

          <div class="feedback">
            <h3>Feedback</h3>

            <p>
              {{ evaluation.feedback }}
            </p>
          </div>

          <div class="evaluation-columns">

            <div class="evaluation-column">
              <h3>Strengths</h3>

              <ul>
                <li
                  v-for="strength in evaluation.strengths"
                  :key="strength"
                >
                  <span>✓</span>
                  {{ strength }}
                </li>
              </ul>
            </div>

            <div class="evaluation-column">
              <h3>Areas to Improve</h3>

              <ul>
                <li
                  v-for="improvement in evaluation.improvements"
                  :key="improvement"
                >
                  <span>→</span>
                  {{ improvement }}
                </li>
              </ul>
            </div>

          </div>

        </div>

        <!-- Actions -->
        <div class="actions">

          <!-- Submit -->
          <button
            v-if="!evaluation"
            class="btn btn-primary"
            :disabled="isEvaluating || !answer.trim()"
            @click="submitAnswer"
          >
            <span v-if="isEvaluating">
              Evaluating...
            </span>

            <span v-else>
              Submit Answer →
            </span>
          </button>

          <!-- Next Question -->
          <button
            v-if="evaluation && !isFinished"
            class="btn btn-next"
            type="button"
            @click="handleNextQuestion"
          >
            Next Question →
          </button>

          <!-- Final Result -->
          <button
            v-if="evaluation && isFinished"
            class="btn btn-finish"
            type="button"
            @click="finishInterview"
          >
            View Final Result →
          </button>

        </div>

      </section>

    </main>

  </div>
</template>

<style scoped>
.interview-page {
  min-height: 100vh;
  background: #f8fafc;
  color: #111827;
}

/* Header */

.interview-header {
  height: 70px;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
}

.header-inner {
  max-width: 1200px;
  height: 100%;
  margin: auto;
  padding: 0 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  color: #111827;
  text-decoration: none;
  font-size: 20px;
  font-weight: 700;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.timer {
  display: flex;
  align-items: center;
  gap: 7px;

  font-size: 14px;
  font-weight: 600;
  color: #475569;
}

.exit-btn {
  text-decoration: none;
  color: #64748b;
  font-size: 14px;
  font-weight: 600;
}

/* Main */

.interview-container {
  max-width: 1100px;
  margin: auto;
  padding: 40px 24px 80px;
}

/* Progress */

.progress-section {
  margin-bottom: 35px;
}

.progress-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  font-size: 14px;
  font-weight: 600;
  color: #64748b;
}

.progress-bar {
  height: 8px;
  background: #e2e8f0;
  border-radius: 20px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #2563eb;
  border-radius: 20px;

  transition: width 0.3s ease;
}

/* Interview grid */

.interview-grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px;
  margin-bottom: 30px;
}

/* AI Card */

.ai-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  padding: 30px;

  text-align: center;
}

.ai-avatar {
  margin-bottom: 20px;
}

.avatar-face {
  width: 110px;
  height: 110px;

  margin: auto;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #eff6ff;
  border-radius: 50%;

  font-size: 50px;
}

.speaking-indicator {
  display: inline-block;

  margin-top: 15px;
  padding: 6px 12px;

  border-radius: 20px;

  background: #eff6ff;
  color: #2563eb;

  font-size: 12px;
  font-weight: 700;
}

.ai-info h3 {
  margin: 0 0 8px;

  font-size: 18px;
}

.ai-info p {
  margin: 0;

  color: #64748b;
  font-size: 14px;
  line-height: 1.6;
}

/* Question */

.question-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 18px;

  padding: 40px;
}

.question-label {
  margin-bottom: 18px;

  font-size: 12px;
  font-weight: 800;
  letter-spacing: 1px;

  color: #2563eb;
}

.question-card h1 {
  margin: 0;

  font-size: 30px;
  line-height: 1.4;
  color: #111827;
}

.question-hint {
  margin-top: 30px;
  padding: 14px 16px;

  background: #f8fafc;
  border-radius: 10px;

  color: #64748b;

  font-size: 14px;
  line-height: 1.5;
}

.question-hint span {
  margin-right: 6px;
}

/* Answer */

.answer-section {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 18px;

  padding: 30px;
}

.answer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 15px;
}

.answer-header h2 {
  margin: 0;
  font-size: 20px;
}

.answer-status {
  color: #94a3b8;
  font-size: 13px;
}

.answer-input {
  width: 100%;
  min-height: 180px;

  box-sizing: border-box;

  padding: 18px;

  border: 1px solid #cbd5e1;
  border-radius: 12px;

  resize: vertical;

  font-family: inherit;
  font-size: 16px;
  line-height: 1.6;

  outline: none;
}

.answer-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.answer-input:disabled {
  background: #f8fafc;
}

/* Voice */

.voice-section {
  display: flex;
  align-items: center;
  gap: 14px;

  margin-top: 15px;
}

.voice-btn {
  display: flex;
  align-items: center;
  gap: 8px;

  padding: 10px 16px;

  border: 1px solid #cbd5e1;
  border-radius: 10px;

  background: #ffffff;

  color: #334155;

  font-size: 14px;
  font-weight: 600;

  cursor: pointer;
}

.voice-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.voice-info {
  color: #94a3b8;
  font-size: 13px;
}

/* Evaluation */

.evaluation-card {
  margin-top: 25px;

  padding: 25px;

  background: #f8fafc;

  border: 1px solid #e2e8f0;
  border-radius: 14px;
}

.evaluation-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-bottom: 20px;

  border-bottom: 1px solid #e2e8f0;
}

.evaluation-label {
  color: #2563eb;

  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1px;
}

.evaluation-header h2 {
  margin: 5px 0 0;

  font-size: 20px;
}

.score {
  font-size: 42px;
  font-weight: 800;
  color: #2563eb;
}

.score span {
  font-size: 16px;
  color: #94a3b8;
}

.feedback {
  margin-top: 20px;
}

.feedback h3 {
  margin: 0 0 8px;
  font-size: 16px;
}

.feedback p {
  margin: 0;

  color: #475569;

  line-height: 1.7;
}

.evaluation-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;

  margin-top: 25px;
}

.evaluation-column h3 {
  font-size: 15px;
}

.evaluation-column ul {
  padding: 0;
  margin: 10px 0 0;

  list-style: none;
}

.evaluation-column li {
  display: flex;
  gap: 8px;

  margin-bottom: 8px;

  color: #475569;
  font-size: 14px;
}

/* Actions */

.actions {
  display: flex;
  justify-content: flex-end;

  margin-top: 25px;
}

.btn {
  border: none;
  border-radius: 10px;

  padding: 13px 24px;

  font-size: 15px;
  font-weight: 700;

  cursor: pointer;

  transition: 0.2s;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: #111827;
  color: #ffffff;
}

.btn-primary:hover:not(:disabled) {
  background: #1f2937;
}

.btn-next {
  background: #2563eb;
  color: #ffffff;
}

.btn-next:hover {
  background: #1d4ed8;
}

.btn-finish {
  background: #16a34a;
  color: #ffffff;
}

.btn-finish:hover {
  background: #15803d;
}

/* Responsive */

@media (max-width: 800px) {

  .interview-grid {
    grid-template-columns: 1fr;
  }

  .ai-card {
    display: flex;
    align-items: center;
    gap: 20px;

    text-align: left;
  }

  .avatar-face {
    width: 80px;
    height: 80px;

    margin: 0;

    font-size: 35px;
  }

  .question-card {
    padding: 25px;
  }

  .question-card h1 {
    font-size: 24px;
  }

  .evaluation-columns {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {

  .interview-container {
    padding: 25px 15px 50px;
  }

  .header-inner {
    padding: 0 15px;
  }

  .timer {
    display: none;
  }

  .question-card h1 {
    font-size: 21px;
  }

  .answer-section {
    padding: 20px;
  }

  .voice-section {
    flex-direction: column;
    align-items: flex-start;
  }

  .actions {
    width: 100%;
  }

  .btn {
    width: 100%;
  }
}
</style>