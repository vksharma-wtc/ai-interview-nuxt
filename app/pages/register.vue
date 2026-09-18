<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: false
})

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const agreeTerms = ref(false)
const isLoading = ref(false)
const error = ref('')

async function register() {
  error.value = ''

  if (!name.value || !email.value || !password.value || !confirmPassword.value) {
    error.value = 'Please fill in all required fields.'
    return
  }

  if (password.value.length < 8) {
    error.value = 'Password must contain at least 8 characters.'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match.'
    return
  }

  if (!agreeTerms.value) {
    error.value = 'Please accept the Terms and Privacy Policy.'
    return
  }

  isLoading.value = true

  try {
    // Temporary registration logic
    // Later we will replace this with:
    
     await $fetch('https://api.chiragtech.com/auth/register', {
       method: 'POST',
       body: {
         first_name: name.value,
         email: email.value,
         password: password.value
       }
     })

    await new Promise(resolve => setTimeout(resolve, 800))

    console.log('Register:', {
      name: name.value,
      email: email.value
    })

    // Temporary redirect
    await navigateTo('/dashboard')
  } catch (err) {
    error.value = 'Unable to create your account. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="auth-page">

    <!-- LEFT -->
    <div class="auth-left">

      <div class="brand">
        <div class="brand-icon">AI</div>
        <span>AI Interviewer</span>
      </div>

      <div class="hero-content">

        <div class="badge">
          <span class="dot"></span>
          Start Your Interview Journey
        </div>

        <h1>
          Build confidence.<br />
          <span>Get interview ready.</span>
        </h1>

        <p>
          Create your free account and start practicing
          technical interviews with an AI interviewer.
        </p>

        <div class="stats">

          <div class="stat">
            <strong>AI</strong>
            <span>Powered</span>
          </div>

          <div class="stat">
            <strong>24/7</strong>
            <span>Practice</span>
          </div>

          <div class="stat">
            <strong>∞</strong>
            <span>Interviews</span>
          </div>

        </div>

        <div class="quote">
          <div class="quote-mark">“</div>

          <p>
            The best way to prepare for an interview
            is to practice explaining what you know.
          </p>

          <span>— AI Interviewer</span>
        </div>

      </div>

      <div class="copyright">
        © {{ new Date().getFullYear() }} AI Interviewer. All rights reserved.
      </div>

    </div>

    <!-- RIGHT -->
    <div class="auth-right">

      <div class="auth-container">

        <div class="mobile-brand">
          <div class="brand-icon">AI</div>
          <span>AI Interviewer</span>
        </div>

        <div class="form-header">
          <h2>Create your account</h2>
          <p>Start practicing with your AI interviewer today.</p>
        </div>

        <!-- ERROR -->
        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <form @submit.prevent="register">

          <!-- NAME -->
          <div class="form-group">
            <label for="name">Full name</label>

            <div class="input-wrapper">
              <span class="input-icon">👤</span>

              <input
                id="name"
                v-model="name"
                type="text"
                placeholder="Your name"
                autocomplete="name"
              />
            </div>
          </div>

          <!-- EMAIL -->
          <div class="form-group">
            <label for="email">Email address</label>

            <div class="input-wrapper">
              <span class="input-icon">✉</span>

              <input
                id="email"
                v-model="email"
                type="email"
                placeholder="you@example.com"
                autocomplete="email"
              />
            </div>
          </div>

          <!-- PASSWORD -->
          <div class="form-group">
            <label for="password">Password</label>

            <div class="input-wrapper">
              <span class="input-icon">🔒</span>

              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Minimum 8 characters"
                autocomplete="new-password"
              />

              <button
                type="button"
                class="password-toggle"
                @click="showPassword = !showPassword"
              >
                {{ showPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
          </div>

          <!-- CONFIRM PASSWORD -->
          <div class="form-group">
            <label for="confirmPassword">Confirm password</label>

            <div class="input-wrapper">
              <span class="input-icon">🔒</span>

              <input
                id="confirmPassword"
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="Confirm your password"
                autocomplete="new-password"
              />

              <button
                type="button"
                class="password-toggle"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                {{ showConfirmPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
          </div>

          <!-- TERMS -->
          <div class="terms-row">

            <label class="checkbox-label">
              <input
                v-model="agreeTerms"
                type="checkbox"
              />

              <span>
                I agree to the
                <a href="#" @click.prevent>Terms</a>
                and
                <a href="#" @click.prevent>Privacy Policy</a>.
              </span>
            </label>

          </div>

          <!-- REGISTER -->
          <button
            type="submit"
            class="register-button"
            :disabled="isLoading"
          >
            <span v-if="isLoading">Creating account...</span>
            <span v-else>Create free account →</span>
          </button>

        </form>

        <div class="divider">
          <span>OR</span>
        </div>

        <!-- GOOGLE -->
        <button
          type="button"
          class="google-button"
          @click="console.log('Google signup - coming soon')"
        >
          <span class="google-icon">G</span>
          Sign up with Google
        </button>

        <div class="login-link">
          Already have an account?
          <NuxtLink to="/login">
            Sign in
          </NuxtLink>
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

/* STATS */

.stats {
  display: flex;
  gap: 50px;
  margin-top: 45px;
  padding: 25px 0;
  border-top: 1px solid rgba(255,255,255,0.08);
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.stat strong,
.stat span {
  display: block;
}

.stat strong {
  font-size: 25px;
  color: #a5b4fc;
}

.stat span {
  color: #9ca3af;
  font-size: 12px;
  margin-top: 3px;
}

/* QUOTE */

.quote {
  margin-top: 32px;
  position: relative;
}

.quote-mark {
  font-size: 50px;
  line-height: 30px;
  color: #6366f1;
}

.quote p {
  color: #d1d5db;
  font-size: 14px;
  line-height: 1.6;
  max-width: 450px;
}

.quote span {
  color: #6b7280;
  font-size: 12px;
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

.form-header {
  margin-bottom: 30px;
}

.form-header h2 {
  font-size: 34px;
  letter-spacing: -1px;
  color: #111827;
  margin: 0 0 8px;
}

.form-header p {
  color: #6b7280;
  font-size: 15px;
  margin: 0;
}

/* FORM */

.form-group {
  margin-bottom: 17px;
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
  height: 50px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  padding: 0 60px 0 45px;
  font-size: 14px;
  outline: none;
  transition: 0.2s;
}

.input-wrapper input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.input-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  font-size: 15px;
}

.password-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  color: #6366f1;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
}

/* TERMS */

.terms-row {
  margin: 8px 0 20px;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  color: #6b7280;
  font-size: 12px;
  line-height: 1.5;
  cursor: pointer;
}

.checkbox-label input {
  width: 15px;
  height: 15px;
  margin-top: 2px;
  flex-shrink: 0;
  accent-color: #6366f1;
}

.checkbox-label a {
  color: #6366f1;
  text-decoration: none;
}

/* REGISTER BUTTON */

.register-button {
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

.register-button:hover {
  background: #4f46e5;
}

.register-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* DIVIDER */

.divider {
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 23px 0;
  color: #9ca3af;
  font-size: 11px;
}

.divider::before,
.divider::after {
  content: "";
  height: 1px;
  background: #e5e7eb;
  flex: 1;
}

/* GOOGLE */

.google-button {
  width: 100%;
  height: 52px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  background: white;
  color: #374151;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.google-icon {
  font-size: 18px;
  font-weight: 700;
}

/* LOGIN */

.login-link {
  text-align: center;
  margin-top: 25px;
  color: #6b7280;
  font-size: 14px;
}

.login-link a {
  color: #6366f1;
  font-weight: 700;
  text-decoration: none;
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
    margin-bottom: 45px;
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
    margin-bottom: 35px;
  }
}
</style>