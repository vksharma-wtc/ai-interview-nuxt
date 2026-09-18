<script setup lang="ts">
import { computed } from 'vue'

interface QuestionEvaluation {
  id?: number | string
  question: string
  answer: string
  score: number // score out of 10
  feedback: string
  strengths: string[]
  improvements: string[]
}

interface InterviewSession {
  duration: string
  evaluations: QuestionEvaluation[]
}

// Access shared interview session state across components/pages
const session = useState<InterviewSession>('interviewSession', () => ({
  duration: '12:34',
  evaluations: [
    {
      id: 1,
      question: 'Tell me about yourself and your experience as a software developer.',
      answer: 'I am a senior technical lead with 14 years of experience...',
      score: 8,
      feedback: 'Good introduction with relevant professional experience.',
      strengths: [
        'Clear explanation of career trajectory',
        'Good technical foundation and experience depth'
      ],
      improvements: [
        'Provide specific project metrics and scale',
        'Name domain scales or key client types'
      ]
    },
    {
      id: 2,
      question: 'What is the difference between REST API and GraphQL?',
      answer: 'REST is endpoint-oriented whereas GraphQL allows querying specific data.',
      score: 9,
      feedback: 'Correct explanation with a good understanding of both approaches.',
      strengths: [
        'Accurate architectural distinction',
        'Concise explanation of data fetching efficiency'
      ],
      improvements: [
        'Mention HTTP method differences (GET/POST vs single POST endpoint)',
        'Touch upon performance trade-offs like caching'
      ]
    }
  ]
}))

// 1. Calculate overall score out of 100
const overallScore = computed(() => {
  const evaluations = session.value?.evaluations || []
  if (!evaluations.length) return 0
  const total = evaluations.reduce((acc, curr) => acc + (curr.score || 0), 0)
  return Math.round((total / (evaluations.length * 10)) * 100)
})

// 2. Rating label based on calculated overall score
const overallRatingLabel = computed(() => {
  const score = overallScore.value
  if (score >= 85) return 'Exceptional Performance'
  if (score >= 70) return 'Strong Performance'
  if (score >= 50) return 'Average Performance'
  return 'Needs Improvement'
})

// 3. Dynamic skill breakdown computed relative to overall performance
const scores = computed(() => {
  const baseScore = overallScore.value
  return [
    { label: 'Technical Knowledge', score: Math.min(100, Math.round(baseScore * 1.02)) },
    { label: 'Communication', score: Math.min(100, Math.round(baseScore * 0.95)) },
    { label: 'Problem Solving', score: Math.min(100, Math.round(baseScore * 0.98)) },
    { label: 'Confidence', score: Math.min(100, Math.round(baseScore * 0.96)) }
  ]
})

// 4. Extract all unique strengths across all evaluated questions
const strengths = computed(() => {
  const evaluations = session.value?.evaluations || []
  const list = evaluations.flatMap(e => e.strengths || [])
  return [...new Set(list)].filter(Boolean)
})

// 5. Extract all unique improvement points across evaluated questions
const improvements = computed(() => {
  const evaluations = session.value?.evaluations || []
  const list = evaluations.flatMap(e => e.improvements || [])
  return [...new Set(list)].filter(Boolean)
})

// 6. Generate dynamic interview summary based on evaluated data
const interviewSummary = computed(() => {
  const score = overallScore.value
  const count = session.value?.evaluations?.length || 0

  if (score >= 80) {
    return `The candidate completed ${count} questions with a strong overall score of ${score}/100. Answers demonstrated high technical understanding and clear delivery, with minor opportunities to provide deeper architecture trade-offs.`
  } else if (score >= 60) {
    return `The candidate completed ${count} questions with an overall score of ${score}/100. Demonstrates baseline technical knowledge, but would benefit from adding more concrete examples and structured explanations.`
  } else {
    return `The candidate answered ${count} questions scoring ${score}/100 overall. Technical responses require significant revision, clearer structure, and deeper domain knowledge.`
  }
})

// Navigation & actions
const restartInterview = () => {
  session.value.evaluations = []
  navigateTo('/interview')
}

const goHome = () => {
  navigateTo('/')
}

const downloadReport = () => {
  window.print()
}
</script>

<template>
  <div class="result-page">

    <!-- Header -->
    <header class="result-header">
      <div class="header-inner">

        <NuxtLink to="/" class="logo">
          AI Interviewer
        </NuxtLink>

        <NuxtLink to="/" class="back-home">
          ← Back to Home
        </NuxtLink>

      </div>
    </header>

    <!-- Main -->
    <main class="result-container">

      <!-- Page Heading -->
      <section class="result-heading">

        <div>
          <span class="eyebrow">
            INTERVIEW COMPLETED
          </span>

          <h1>
            Your Interview Results
          </h1>

          <p>
            Here's a detailed assessment of your interview performance.
          </p>
        </div>

        <div class="completed-badge">
          ✓ Completed
        </div>

      </section>

      <!-- Overall Score -->
      <section class="overall-card">

        <div class="overall-left">

          <div class="score-circle">
            <div class="score-number">
              {{ overallScore }}
            </div>

            <div class="score-total">
              /100
            </div>
          </div>

          <div class="overall-info">

            <span class="score-label">
              OVERALL SCORE
            </span>

            <h2>
              {{ overallRatingLabel }}
            </h2>

            <p>
              You scored {{ overallScore }} out of 100 across {{ session.evaluations.length }} questions.
            </p>

          </div>

        </div>

        <div class="overall-right">

          <div class="stat">
            <span>Questions</span>
            <strong>{{ session.evaluations.length }}</strong>
          </div>

          <div class="stat">
            <span>Duration</span>
            <strong>{{ session.duration }}</strong>
          </div>

          <div class="stat">
            <span>Rating</span>
            <strong>{{ overallScore >= 70 ? 'Good' : 'Needs Practice' }}</strong>
          </div>

        </div>

      </section>

      <!-- Skill Scores -->
      <section class="section">

        <div class="section-heading">
          <h2>Performance Breakdown</h2>

          <p>
            Your performance across different interview skills.
          </p>
        </div>

        <div class="skills-card">

          <div
            v-for="item in scores"
            :key="item.label"
            class="skill-row"
          >

            <div class="skill-info">

              <span>
                {{ item.label }}
              </span>

              <strong>
                {{ item.score }}/100
              </strong>

            </div>

            <div class="skill-bar">

              <div
                class="skill-fill"
                :style="{ width: `${item.score}%` }"
              ></div>

            </div>

          </div>

        </div>

      </section>

      <!-- Strengths & Improvements -->
      <section class="two-column">

        <!-- Strengths -->
        <div class="feedback-card">

          <div class="feedback-title">
            <div class="feedback-icon strength-icon">
              ✓
            </div>

            <div>
              <h2>Strengths</h2>
              <p>What you did well</p>
            </div>
          </div>

          <ul class="feedback-list">

            <li
              v-for="(strength, index) in strengths"
              :key="index"
            >
              <span class="check">
                ✓
              </span>

              <span>
                {{ strength }}
              </span>
            </li>

            <li v-if="!strengths.length">
              <span class="check">-</span>
              <span>No major strengths detected in answers.</span>
            </li>

          </ul>

        </div>

        <!-- Improvements -->
        <div class="feedback-card">

          <div class="feedback-title">
            <div class="feedback-icon improvement-icon">
              →
            </div>

            <div>
              <h2>Areas to Improve</h2>
              <p>Where you can get better</p>
            </div>
          </div>

          <ul class="feedback-list">

            <li
              v-for="(improvement, index) in improvements"
              :key="index"
            >
              <span class="arrow">
                →
              </span>

              <span>
                {{ improvement }}
              </span>
            </li>

            <li v-if="!improvements.length">
              <span class="arrow">-</span>
              <span>No major improvement areas detected.</span>
            </li>

          </ul>

        </div>

      </section>

      <!-- AI Summary -->
      <section class="summary-card">

        <div class="summary-icon">
          🤖
        </div>

        <div class="summary-content">

          <span class="eyebrow">
            AI INTERVIEWER SUMMARY
          </span>

          <h2>
            Overall Assessment
          </h2>

          <p>
            {{ interviewSummary }}
          </p>

        </div>

      </section>

      <!-- Question Results -->
      <section class="section">

        <div class="section-heading">
          <h2>Question Performance</h2>

          <p>
            Review how you performed on each question.
          </p>
        </div>

        <div class="questions-card">

          <div
            v-for="(item, index) in session.evaluations"
            :key="item.id || index"
            class="question-result"
          >

            <div class="question-number">
              {{ String(index + 1).padStart(2, '0') }}
            </div>

            <div class="question-content">

              <h3>
                {{ item.question }}
              </h3>

              <p>
                {{ item.feedback }}
              </p>

            </div>

            <div class="question-score">
              {{ item.score }}/10
            </div>

          </div>

        </div>

      </section>

      <!-- Actions -->
      <section class="actions">

        <button
          class="btn btn-secondary"
          type="button"
          @click="goHome"
        >
          ← Back to Home
        </button>

        <button
          class="btn btn-outline"
          type="button"
          @click="downloadReport"
        >
          ↓ Download Report
        </button>

        <button
          class="btn btn-primary"
          type="button"
          @click="restartInterview"
        >
          Start New Interview →
        </button>

      </section>

    </main>

    <!-- Footer -->
    <footer class="footer">
      <p>
        AI Interviewer · Practice smarter. Interview better.
      </p>
    </footer>

  </div>
</template>

<style scoped>
.result-page {
  min-height: 100vh;
  background: #f8fafc;
  color: #111827;
}

/* Header */

.result-header {
  height: 70px;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
}

.header-inner {
  max-width: 1100px;
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
  font-weight: 800;
}

.back-home {
  color: #64748b;
  text-decoration: none;

  font-size: 14px;
  font-weight: 600;
}

/* Main */

.result-container {
  max-width: 1100px;
  margin: auto;
  padding: 50px 24px 70px;
}

/* Heading */

.result-heading {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  margin-bottom: 30px;
}

.eyebrow {
  display: block;

  margin-bottom: 8px;

  color: #2563eb;

  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1px;
}

.result-heading h1 {
  margin: 0;

  font-size: 36px;
  line-height: 1.2;
}

.result-heading p {
  margin: 12px 0 0;

  color: #64748b;
  font-size: 16px;
}

.completed-badge {
  padding: 9px 15px;

  border-radius: 30px;

  background: #dcfce7;
  color: #15803d;

  font-size: 13px;
  font-weight: 700;
}

/* Overall */

.overall-card {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 35px;

  background: #ffffff;

  border: 1px solid #e5e7eb;
  border-radius: 20px;

  margin-bottom: 45px;
}

.overall-left {
  display: flex;
  align-items: center;
  gap: 25px;
}

.score-circle {
  width: 125px;
  height: 125px;

  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: #eff6ff;
  border: 8px solid #dbeafe;
}

.score-number {
  color: #2563eb;

  font-size: 36px;
  font-weight: 800;
  line-height: 1;
}

.score-total {
  margin-top: 4px;

  color: #64748b;

  font-size: 13px;
}

.score-label {
  color: #2563eb;

  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1px;
}

.overall-info h2 {
  margin: 6px 0;

  font-size: 24px;
}

.overall-info p {
  margin: 0;

  color: #64748b;
}

.overall-right {
  display: flex;
  gap: 45px;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.stat span {
  color: #94a3b8;

  font-size: 12px;
}

.stat strong {
  color: #111827;

  font-size: 18px;
}

/* Section */

.section {
  margin-bottom: 45px;
}

.section-heading {
  margin-bottom: 18px;
}

.section-heading h2 {
  margin: 0;

  font-size: 22px;
}

.section-heading p {
  margin: 7px 0 0;

  color: #64748b;

  font-size: 14px;
}

/* Skills */

.skills-card {
  padding: 30px;

  background: #ffffff;

  border: 1px solid #e5e7eb;
  border-radius: 16px;
}

.skill-row {
  margin-bottom: 25px;
}

.skill-row:last-child {
  margin-bottom: 0;
}

.skill-info {
  display: flex;
  justify-content: space-between;

  margin-bottom: 9px;

  font-size: 14px;
}

.skill-info span {
  color: #475569;
}

.skill-info strong {
  color: #111827;
}

.skill-bar {
  height: 9px;

  overflow: hidden;

  background: #e2e8f0;

  border-radius: 20px;
}

.skill-fill {
  height: 100%;

  background: #2563eb;

  border-radius: 20px;

  transition: width 0.5s ease;
}

/* Two column */

.two-column {
  display: grid;
  grid-template-columns: 1fr 1fr;

  gap: 25px;

  margin-bottom: 45px;
}

.feedback-card {
  padding: 28px;

  background: #ffffff;

  border: 1px solid #e5e7eb;
  border-radius: 16px;
}

.feedback-title {
  display: flex;
  align-items: center;

  gap: 14px;

  margin-bottom: 22px;
}

.feedback-icon {
  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 12px;

  font-size: 20px;
  font-weight: 800;
}

.strength-icon {
  background: #dcfce7;
  color: #16a34a;
}

.improvement-icon {
  background: #fef3c7;
  color: #d97706;
}

.feedback-title h2 {
  margin: 0;

  font-size: 19px;
}

.feedback-title p {
  margin: 4px 0 0;

  color: #94a3b8;

  font-size: 13px;
}

.feedback-list {
  list-style: none;

  padding: 0;
  margin: 0;
}

.feedback-list li {
  display: flex;
  align-items: flex-start;

  gap: 10px;

  margin-bottom: 13px;

  color: #475569;

  font-size: 14px;
  line-height: 1.5;
}

.feedback-list li:last-child {
  margin-bottom: 0;
}

.check {
  color: #16a34a;
  font-weight: 800;
}

.arrow {
  color: #d97706;
  font-weight: 800;
}

/* Summary */

.summary-card {
  display: flex;

  gap: 20px;

  margin-bottom: 45px;
  padding: 30px;

  background: #eff6ff;

  border: 1px solid #dbeafe;
  border-radius: 16px;
}

.summary-icon {
  width: 55px;
  height: 55px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #ffffff;

  border-radius: 14px;

  font-size: 26px;
}

.summary-content h2 {
  margin: 0 0 10px;

  font-size: 21px;
}

.summary-content p {
  margin: 0;

  color: #475569;

  line-height: 1.7;
  font-size: 15px;
}

/* Questions */

.questions-card {
  background: #ffffff;

  border: 1px solid #e5e7eb;
  border-radius: 16px;

  overflow: hidden;
}

.question-result {
  display: grid;

  grid-template-columns: 55px 1fr auto;

  gap: 20px;

  align-items: center;

  padding: 22px 25px;

  border-bottom: 1px solid #e5e7eb;
}

.question-result:last-child {
  border-bottom: none;
}

.question-number {
  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #f1f5f9;

  border-radius: 10px;

  color: #64748b;

  font-size: 12px;
  font-weight: 800;
}

.question-content h3 {
  margin: 0 0 6px;

  font-size: 15px;
  line-height: 1.5;
}

.question-content p {
  margin: 0;

  color: #64748b;

  font-size: 13px;
}

.question-score {
  color: #2563eb;

  font-size: 17px;
  font-weight: 800;
}

/* Actions */

.actions {
  display: flex;

  justify-content: flex-end;

  gap: 12px;

  padding-top: 10px;
}

.btn {
  padding: 13px 20px;

  border-radius: 10px;

  font-size: 14px;
  font-weight: 700;

  cursor: pointer;
}

.btn-primary {
  border: none;

  background: #2563eb;
  color: #ffffff;
}

.btn-primary:hover {
  background: #1d4ed8;
}

.btn-secondary {
  border: 1px solid #e2e8f0;

  background: #ffffff;
  color: #475569;
}

.btn-outline {
  border: 1px solid #cbd5e1;

  background: #ffffff;
  color: #334155;
}

/* Footer */

.footer {
  padding: 30px;

  border-top: 1px solid #e5e7eb;

  text-align: center;

  color: #94a3b8;

  font-size: 13px;
}

/* Responsive */

@media (max-width: 800px) {

  .result-heading {
    align-items: flex-start;

    flex-direction: column;

    gap: 20px;
  }

  .result-heading h1 {
    font-size: 30px;
  }

  .overall-card {
    flex-direction: column;

    align-items: flex-start;

    gap: 30px;
  }

  .overall-right {
    width: 100%;

    justify-content: space-between;

    gap: 15px;
  }

  .two-column {
    grid-template-columns: 1fr;
  }

  .actions {
    flex-wrap: wrap;

    justify-content: stretch;
  }

  .actions .btn {
    flex: 1;
  }
}

@media (max-width: 600px) {

  .result-container {
    padding: 35px 15px 50px;
  }

  .header-inner {
    padding: 0 15px;
  }

  .back-home {
    display: none;
  }

  .result-heading h1 {
    font-size: 27px;
  }

  .overall-left {
    flex-direction: column;

    align-items: flex-start;
  }

  .overall-right {
    flex-direction: column;

    gap: 15px;
  }

  .skills-card,
  .feedback-card,
  .summary-card {
    padding: 20px;
  }

  .question-result {
    grid-template-columns: 45px 1fr;
  }

  .question-score {
    grid-column: 2;
  }

  .actions {
    flex-direction: column;
  }

  .actions .btn {
    width: 100%;
  }
}

/* Print */

@media print {

  .result-header,
  .actions,
  .footer,
  .back-home {
    display: none !important;
  }

  .result-page {
    background: #ffffff;
  }

  .result-container {
    max-width: none;
  }

  .overall-card,
  .skills-card,
  .feedback-card,
  .summary-card,
  .questions-card {
    break-inside: avoid;
  }
}
</style>