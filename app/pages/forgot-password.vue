<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: false
})

const email = ref('')
const isLoading = ref(false)
const success = ref(false)
const error = ref('')

async function sendResetLink() {
  error.value = ''
  success.value = false

  if (!email.value) {
    error.value = 'Please enter your email address.'
    return
  }

  isLoading.value = true

  try {
    // Temporary logic
    // Later we will replace this with:
    //
    // await $fetch('/api/auth/forgot-password', {
    //   method: 'POST',
    //   body: {
    //     email: email.value
    //   }
    // })

    await new Promise(resolve => setTimeout(resolve, 800))

    success.value = true
  } catch (err) {
    error.value = 'Unable to send reset link. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="auth-page">

    <!-- LEFT SIDE -->
    <div class="auth-left">

      <div class="brand">
        <div class="brand-icon">AI</div>
        <span>AI Interviewer</span>
      </div>

      <div class="hero-content">

        <div class="badge">
          <span class="dot"></span>
          AI-Powered Interview Practice
        </div>

        <h1>
          Keep learning.<br />
          <span>Keep improving.</span>
        </h1>

        <p>
          Your interview preparation journey is waiting for you.
          Reset your password and continue practicing with AI.
        </p>

        <div class="features">

          <div class="feature">
            <div class="feature-icon">✓</div>

            <div>
              <strong>AI-powered interviews</strong>
              <span>Practice realistic technical interviews</span>
            </div>
          </div>

          <div class="feature">
            <div class="feature-icon">✓</div>

            <div>
              <strong>Personalized feedback</strong>
              <span>Understand your strengths and weaknesses</span>
            </div>
          </div>

          <div class="feature">
            <div class="feature-icon">✓</div>

            <div>
              <strong>Track your progress</strong>
              <span>Improve with every interview</span>
            </div>
          </div>

        </div>

      </div>

      <div class="copyright">
        © {{ new Date().getFullYear() }} AI Interviewer. All rights reserved.
      </div>

    </div>

    <!-- RIGHT SIDE -->
    <div class="auth-right">

      <div class="auth-container">

        <!-- MOBILE BRAND -->
        <div class="mobile-brand">
          <div class="brand-icon">AI</div>
          <span>AI Interviewer</span>
        </div>

        <!-- BACK -->
        <NuxtLink to="/login" class="back-link">
          ← Back to login
        </NuxtLink>

        <div class="form-header">
          <div class="lock-icon">
            🔐
          </div>

          <h2>Forgot your password?</h2>

          <p>
            No worries. Enter your email address and
            we'll send you a link to reset your password.
          </p>
        </div>

        <!-- ERROR -->
        <div
          v-if="error"
          class="error-message"
        >
          {{ error }}
        </div>

        <!-- SUCCESS -->
        <div
          v-if="success"
          class="success-message"
        >
          <div class="success-icon">✓</div>

          <div>
            <strong>Reset link sent</strong>

            <p>
              If an account exists for
              <strong>{{ email }}</strong>,
              you will receive a password reset link shortly.
            </p>
          </div>
        </div>

        <!-- FORM -->
        <form
          v-if="!success"
          @submit.prevent="sendResetLink"
        >

          <div class="form-group">

            <label for="email">
              Email address
            </label>

            <div class="input-wrapper">

              <span class="input-icon">
                ✉
              </span>

              <input
                id="email"
                v-model="email"
                type="email"
                placeholder="you@example.com"
                autocomplete="email"
              />

            </div>

          </div>

          <button
            type="submit"
            class="reset-button"
            :disabled="isLoading"
          >
            <span v-if="isLoading">
              Sending...
            </span>

            <span v-else>
              Send reset link →
            </span>
          </button>

        </form>

        <!-- SUCCESS ACTION -->
        <div
          v-if="success"
          class="success-actions"
        >

          <NuxtLink
            to="/login"
            class="login-button"
          >
            Return to login
          </NuxtLink>

          <button
            type="button"
            class="try-again"
            @click="success = false"
          >
            Use a different email
          </button>

        </div>

        <div class="help-text">
          Remember your password?

          <NuxtLink to="/login">
            Sign in
          </NuxtLink>
        </div>

        <div class="security-note">
          🔒 Your account information is secure and private.
        </div>

      </div>

    </div>

  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.auth-page {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48% 52%;
  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
}

/* LEFT */

.auth-left {
  background: #111827;
  color: white;
  padding: 42px 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.brand,
.mobile-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 21px;
  font-weight: 700;
}

.brand-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #6366f1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 800;
}

.hero-content {
  max-width: 540px;
  margin: auto 0;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.08);
  color: #c7d2fe;
  font-size: 13px;
  margin-bottom: 28px;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #818cf8;
}

.hero-content h1 {
  font-size: clamp(42px, 5vw, 64px);
  line-height: 1.05;
  letter-spacing: -2px;
  margin: 0 0 25px;
}

.hero-content h1 span {
  color: #818cf8;
}

.hero-content > p {
  color: #9ca3af;
  font-size: 17px;
  line-height: 1.7;
  max-width: 500px;
}

.features {
  margin-top: 42px;
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.feature {
  display: flex;
  gap: 15px;
  align-items: center;
}

.feature-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(99, 102, 241, 0.2);
  color: #a5b4fc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.feature strong,
.feature span {
  display: block;
}

.feature strong {
  font-size: 14px;
  margin-bottom: 4px;
}

.feature span {
  font-size: 13px;
  color: #9ca3af;
}

.copyright {
  color: #6b7280;
  font-size: 12px;
}

/* RIGHT */

.auth-right {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  padding: 40px;
}

.auth-container {
  width: 100%;
  max-width: 430px;
}

.mobile-brand {
  display: none;
}

/* BACK */

.back-link {
  display: inline-block;
  color: #6b7280;
  font-size: 13px;
  text-decoration: none;
  margin-bottom: 35px;
}

.back-link:hover {
  color: #6366f1;
}

/* HEADER */

.form-header {
  margin-bottom: 28px;
}

.lock-icon {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  background: #eef2ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 23px;
  margin-bottom: 20px;
}

.form-header h2 {
  font-size: 32px;
  letter-spacing: -1px;
  color: #111827;
  margin: 0 0 10px;
}

.form-header p {
  color: #6b7280;
  font-size: 15px;
  line-height: 1.6;
  margin: 0;
}

/* FORM */

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  color: #374151;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
}

.input-wrapper {
  position: relative;
}

.input-wrapper input {
  width: 100%;
  height: 52px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  padding: 0 45px;
  font-size: 14px;
  outline: none;
  transition: 0.2s;
}

.input-wrapper input:focus {
  border-color: #6366f1;
  box-shadow:
    0 0 0 3px rgba(99, 102, 241, 0.1);
}

.input-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
}

/* BUTTON */

.reset-button {
  width: 100%;
  height: 52px;
  border: none;
  border-radius: 10px;
  background: #6366f1;
  color: white;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s;
}

.reset-button:hover {
  background: #4f46e5;
}

.reset-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* ERROR */

.error-message {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 12px 14px;
  border-radius: 8px;
  font-size: 13px;
  margin-bottom: 20px;
}

/* SUCCESS */

.success-message {
  display: flex;
  gap: 12px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 20px;
}

.success-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #22c55e;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.success-message strong {
  color: #166534;
  font-size: 13px;
}

.success-message p {
  color: #166534;
  font-size: 12px;
  line-height: 1.5;
  margin: 5px 0 0;
}

/* SUCCESS ACTIONS */

.success-actions {
  text-align: center;
}

.login-button {
  width: 100%;
  height: 52px;
  border-radius: 10px;
  background: #6366f1;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 15px;
  font-weight: 700;
}

.try-again {
  margin-top: 15px;
  border: none;
  background: transparent;
  color: #6366f1;
  cursor: pointer;
  font-size: 13px;
}

/* HELP */

.help-text {
  text-align: center;
  margin-top: 28px;
  color: #6b7280;
  font-size: 14px;
}

.help-text a {
  color: #6366f1;
  font-weight: 700;
  text-decoration: none;
}

/* SECURITY */

.security-note {
  text-align: center;
  color: #9ca3af;
  font-size: 11px;
  margin-top: 30px;
}

/* MOBILE */

@media (max-width: 900px) {

  .auth-page {
    grid-template-columns: 1fr;
  }

  .auth-left {
    display: none;
  }

  .auth-right {
    min-height: 100vh;
    padding: 30px 20px;
  }

  .mobile-brand {
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
  }

  .form-header h2 {
    font-size: 30px;
  }
}

@media (max-width: 480px) {

  .auth-right {
    padding: 25px 18px;
  }

  .mobile-brand {
    margin-bottom: 30px;
  }

  .back-link {
    margin-bottom: 25px;
  }
}
</style>