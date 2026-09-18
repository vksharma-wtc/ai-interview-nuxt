<script setup lang="ts">
const startInterview = () => {
  navigateTo('/interview')
}
</script>

<template>
  <div class="home-page">

    <!-- Hero -->
    <section class="hero">

      <div class="hero-container">

        <!-- Left -->
        <div class="hero-content">

          <div class="badge">
            🤖 AI-Powered Interview Practice
          </div>

          <h1>
            Practice Interviews.
            <span>Get Better.</span>
            Get Hired.
          </h1>

          <p class="hero-description">
            Practice realistic technical interviews with an AI interviewer.
            Get instant feedback, detailed scores, and actionable
            recommendations to improve your interview performance.
          </p>

          <div class="hero-actions">

            <button
              class="btn btn-primary"
              type="button"
              @click="startInterview"
            >
              Start Free Interview →
            </button>

            <a
              href="#how-it-works"
              class="btn btn-secondary"
            >
              How It Works
            </a>

          </div>

          <div class="trust-info">

            <div class="trust-item">
              <span>✓</span>
              No credit card required
            </div>

            <div class="trust-item">
              <span>✓</span>
              Instant AI feedback
            </div>

            <div class="trust-item">
              <span>✓</span>
              Practice anytime
            </div>

          </div>

        </div>

        <!-- Right -->
        <div class="hero-visual">

          <div class="interview-preview">

            <!-- Preview Header -->
            <div class="preview-header">

              <div class="preview-title">
                <div class="ai-small">
                  🤖
                </div>

                <div>
                  <strong>AI Interviewer</strong>
                  <span>Technical Interview</span>
                </div>
              </div>

              <div class="live">
                <span></span>
                LIVE
              </div>

            </div>

            <!-- AI Message -->
            <div class="message ai-message">

              <div class="message-avatar">
                🤖
              </div>

              <div class="message-content">

                <span class="message-label">
                  AI INTERVIEWER
                </span>

                <p>
                  How would you design a scalable
                  e-commerce application?
                </p>

              </div>

            </div>

            <!-- Candidate -->
            <div class="message candidate-message">

              <div class="message-content">

                <span class="message-label">
                  YOUR ANSWER
                </span>

                <p>
                  I would use a modular architecture
                  with caching, load balancing and...
                </p>

              </div>

              <div class="candidate-avatar">
                👤
              </div>

            </div>

            <!-- Evaluation -->
            <div class="preview-evaluation">

              <div class="evaluation-top">

                <span>
                  AI EVALUATION
                </span>

                <strong>
                  8.5/10
                </strong>

              </div>

              <div class="mini-progress">
                <div></div>
              </div>

              <p>
                Strong answer with good understanding
                of scalability concepts.
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>

    <!-- Stats -->
    <section class="stats">

      <div class="stats-container">

        <div class="stat">
          <strong>AI</strong>
          <span>Powered Interviews</span>
        </div>

        <div class="stat">
          <strong>24/7</strong>
          <span>Practice Anytime</span>
        </div>

        <div class="stat">
          <strong>10+</strong>
          <span>Technical Skills</span>
        </div>

        <div class="stat">
          <strong>Instant</strong>
          <span>AI Feedback</span>
        </div>

      </div>

    </section>

    <!-- Features -->
    <section id="features" class="features">

      <div class="section-container">

        <div class="section-heading">

          <span class="eyebrow">
            WHY AI INTERVIEWER
          </span>

          <h2>
            Everything you need to
            <span>interview better.</span>
          </h2>

          <p>
            Build confidence with realistic interview practice
            and intelligent feedback.
          </p>

        </div>

        <div class="feature-grid">

          <div class="feature-card">

            <div class="feature-icon">
              🤖
            </div>

            <h3>
              AI Interviewer
            </h3>

            <p>
              Practice with an AI interviewer that asks
              relevant questions based on your role and experience.
            </p>

          </div>

          <div class="feature-card">

            <div class="feature-icon">
              📊
            </div>

            <h3>
              Detailed Evaluation
            </h3>

            <p>
              Get scores for technical knowledge,
              communication, problem solving and more.
            </p>

          </div>

          <div class="feature-card">

            <div class="feature-icon">
              🎯
            </div>

            <h3>
              Actionable Feedback
            </h3>

            <p>
              Understand your strengths and discover exactly
              where you need to improve.
            </p>

          </div>

          <div class="feature-card">

            <div class="feature-icon">
              🎙
            </div>

            <h3>
              Voice Interviews
            </h3>

            <p>
              Practice speaking naturally with voice-based
              interviews instead of simply typing answers.
            </p>

          </div>

        </div>

      </div>

    </section>

    <!-- How it works -->
    <section
      id="how-it-works"
      class="how-section"
    >

      <div class="section-container">

        <div class="section-heading">

          <span class="eyebrow">
            HOW IT WORKS
          </span>

          <h2>
            Your interview in
            <span>4 simple steps.</span>
          </h2>

        </div>

        <div class="steps">

          <div class="step">

            <div class="step-number">
              01
            </div>

            <h3>
              Choose Your Role
            </h3>

            <p>
              Select your job role, experience level
              and interview difficulty.
            </p>

          </div>

          <div class="step">

            <div class="step-number">
              02
            </div>

            <h3>
              Meet Your AI Interviewer
            </h3>

            <p>
              Start a realistic interview with
              AI-generated questions.
            </p>

          </div>

          <div class="step">

            <div class="step-number">
              03
            </div>

            <h3>
              Answer Questions
            </h3>

            <p>
              Answer using your voice or by typing
              your response.
            </p>

          </div>

          <div class="step">

            <div class="step-number">
              04
            </div>

            <h3>
              Get Your Report
            </h3>

            <p>
              Receive an AI-generated score and
              personalized improvement plan.
            </p>

          </div>

        </div>

        <div class="cta">

          <h2>
            Ready to practice?
          </h2>

          <p>
            Start your first AI interview today.
          </p>

          <button
            class="btn btn-primary"
            type="button"
            @click="startInterview"
          >
            Start Free Interview →
          </button>

        </div>

      </div>

    </section>

    <!-- Footer -->
    <footer class="footer">

      <div class="footer-container">

        <div class="footer-logo">
          AI Interviewer
        </div>

        <p>
          Practice smarter. Interview better.
        </p>

        <span>
          © 2026 AI Interviewer
        </span>

      </div>

    </footer>

  </div>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  background: #ffffff;
  color: #111827;
}

/* --------------------------------
   Hero
-------------------------------- */

.hero {
  padding: 80px 0 90px;
  background: #f8fafc;
}

.hero-container {
  max-width: 1180px;
  margin: auto;
  padding: 0 24px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 70px;

  align-items: center;
}

.badge {
  display: inline-block;

  padding: 8px 14px;

  background: #eff6ff;
  color: #2563eb;

  border-radius: 30px;

  font-size: 13px;
  font-weight: 700;

  margin-bottom: 22px;
}

.hero-content h1 {
  margin: 0;

  max-width: 650px;

  font-size: 54px;
  line-height: 1.08;
  letter-spacing: -1.5px;
}

.hero-content h1 span {
  color: #2563eb;
}

.hero-description {
  max-width: 600px;

  margin: 25px 0;

  color: #64748b;

  font-size: 17px;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  gap: 12px;

  margin-bottom: 25px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 14px 22px;

  border-radius: 10px;

  font-size: 14px;
  font-weight: 700;

  text-decoration: none;

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
  border: 1px solid #dbe2ea;

  background: #ffffff;
  color: #334155;
}

.trust-info {
  display: flex;
  flex-wrap: wrap;

  gap: 18px;

  color: #64748b;

  font-size: 12px;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.trust-item span {
  color: #16a34a;
  font-weight: 800;
}

/* --------------------------------
   Interview Preview
-------------------------------- */

.hero-visual {
  display: flex;
  justify-content: center;
}

.interview-preview {
  width: 100%;
  max-width: 480px;

  padding: 20px;

  background: #ffffff;

  border: 1px solid #e2e8f0;

  border-radius: 20px;

  box-shadow:
    0 25px 60px rgba(15, 23, 42, 0.08);
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-bottom: 18px;

  border-bottom: 1px solid #e5e7eb;
}

.preview-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.ai-small {
  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #eff6ff;

  border-radius: 12px;

  font-size: 22px;
}

.preview-title strong {
  display: block;

  font-size: 14px;
}

.preview-title span {
  display: block;

  margin-top: 3px;

  color: #94a3b8;

  font-size: 11px;
}

.live {
  display: flex;
  align-items: center;
  gap: 5px;

  color: #16a34a;

  font-size: 10px;
  font-weight: 800;
}

.live span {
  width: 7px;
  height: 7px;

  border-radius: 50%;

  background: #16a34a;
}

/* Messages */

.message {
  display: flex;

  gap: 10px;

  margin-top: 20px;
}

.message-avatar,
.candidate-avatar {
  width: 34px;
  height: 34px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;

  background: #f1f5f9;

  font-size: 17px;
}

.message-content {
  flex: 1;

  padding: 12px 15px;

  border-radius: 12px;

  background: #f8fafc;
}

.message-label {
  display: block;

  margin-bottom: 5px;

  color: #2563eb;

  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.6px;
}

.message p {
  margin: 0;

  color: #475569;

  font-size: 13px;
  line-height: 1.5;
}

.candidate-message {
  justify-content: flex-end;
}

.candidate-message .message-content {
  background: #eff6ff;
}

/* Evaluation */

.preview-evaluation {
  margin-top: 20px;

  padding: 15px;

  border-radius: 12px;

  background: #f8fafc;
}

.evaluation-top {
  display: flex;
  justify-content: space-between;

  font-size: 11px;
  font-weight: 700;
}

.evaluation-top span {
  color: #64748b;
}

.evaluation-top strong {
  color: #2563eb;
}

.mini-progress {
  height: 6px;

  margin: 10px 0;

  background: #e2e8f0;

  border-radius: 20px;
}

.mini-progress div {
  width: 85%;
  height: 100%;

  background: #2563eb;

  border-radius: 20px;
}

.preview-evaluation p {
  margin: 0;

  color: #64748b;

  font-size: 11px;
  line-height: 1.5;
}

/* --------------------------------
   Stats
-------------------------------- */

.stats {
  border-bottom: 1px solid #e5e7eb;
}

.stats-container {
  max-width: 1100px;

  margin: auto;
  padding: 30px 24px;

  display: grid;
  grid-template-columns: repeat(4, 1fr);

  gap: 20px;
}

.stat {
  text-align: center;
}

.stat strong {
  display: block;

  color: #2563eb;

  font-size: 25px;
}

.stat span {
  display: block;

  margin-top: 5px;

  color: #64748b;

  font-size: 12px;
}

/* --------------------------------
   Sections
-------------------------------- */

.features,
.how-section {
  padding: 90px 0;
}

.how-section {
  background: #f8fafc;
}

.section-container {
  max-width: 1100px;

  margin: auto;
  padding: 0 24px;
}

.section-heading {
  max-width: 650px;

  margin: 0 auto 50px;

  text-align: center;
}

.eyebrow {
  display: block;

  margin-bottom: 10px;

  color: #2563eb;

  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1px;
}

.section-heading h2 {
  margin: 0;

  font-size: 35px;
  line-height: 1.2;
}

.section-heading h2 span {
  color: #2563eb;
}

.section-heading p {
  margin-top: 14px;

  color: #64748b;

  line-height: 1.6;
}

/* --------------------------------
   Features
-------------------------------- */

.feature-grid {
  display: grid;

  grid-template-columns: repeat(4, 1fr);

  gap: 20px;
}

.feature-card {
  padding: 25px;

  border: 1px solid #e5e7eb;

  border-radius: 16px;

  background: #ffffff;

  transition: transform 0.2s;
}

.feature-card:hover {
  transform: translateY(-4px);
}

.feature-icon {
  width: 48px;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 18px;

  background: #eff6ff;

  border-radius: 12px;

  font-size: 22px;
}

.feature-card h3 {
  margin: 0 0 10px;

  font-size: 17px;
}

.feature-card p {
  margin: 0;

  color: #64748b;

  font-size: 14px;
  line-height: 1.6;
}

/* --------------------------------
   Steps
-------------------------------- */

.steps {
  display: grid;

  grid-template-columns: repeat(4, 1fr);

  gap: 25px;
}

.step {
  text-align: center;
}

.step-number {
  width: 55px;
  height: 55px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0 auto 18px;

  border-radius: 50%;

  background: #2563eb;
  color: #ffffff;

  font-size: 13px;
  font-weight: 800;
}

.step h3 {
  margin: 0 0 8px;

  font-size: 16px;
}

.step p {
  margin: 0;

  color: #64748b;

  font-size: 13px;
  line-height: 1.6;
}

/* --------------------------------
   CTA
-------------------------------- */

.cta {
  margin-top: 70px;

  padding: 50px 30px;

  background: #111827;

  border-radius: 20px;

  text-align: center;

  color: #ffffff;
}

.cta h2 {
  margin: 0;

  font-size: 30px;
}

.cta p {
  margin: 10px 0 25px;

  color: #cbd5e1;
}

.cta .btn-primary {
  background: #2563eb;
}

/* --------------------------------
   Footer
-------------------------------- */

.footer {
  background: #ffffff;

  border-top: 1px solid #e5e7eb;
}

.footer-container {
  max-width: 1100px;

  margin: auto;
  padding: 30px 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer-logo {
  font-weight: 800;
}

.footer-container p {
  margin: 0;

  color: #64748b;

  font-size: 13px;
}

.footer-container span {
  color: #94a3b8;

  font-size: 12px;
}

/* --------------------------------
   Responsive
-------------------------------- */

@media (max-width: 900px) {

  .hero-container {
    grid-template-columns: 1fr;

    gap: 50px;
  }

  .hero-content {
    text-align: center;
  }

  .hero-content h1,
  .hero-description {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-actions,
  .trust-info {
    justify-content: center;
  }

  .feature-grid,
  .steps {
    grid-template-columns: repeat(2, 1fr);
  }

  .stats-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {

  .hero {
    padding: 55px 0 60px;
  }

  .hero-content h1 {
    font-size: 39px;
  }

  .hero-description {
    font-size: 15px;
  }

  .hero-actions {
    flex-direction: column;
  }

  .hero-actions .btn {
    width: 100%;
  }

  .trust-info {
    flex-direction: column;
    align-items: center;
  }

  .feature-grid,
  .steps,
  .stats-container {
    grid-template-columns: 1fr;
  }

  .features,
  .how-section {
    padding: 65px 0;
  }

  .section-heading h2 {
    font-size: 29px;
  }

  .footer-container {
    flex-direction: column;
    gap: 10px;

    text-align: center;
  }
}
</style>