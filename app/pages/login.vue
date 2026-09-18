<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: false
})

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)
const isLoading = ref(false)
const error = ref('')

async function login() {
  error.value = ''

  if (!email.value || !password.value) {
    error.value = 'Please enter your email and password.'
    return
  }

  isLoading.value = true

  try {
    const response = await $fetch('https://api.chiragtech.com/auth/login', {
    method: 'POST',
    body: {
      email: email.value,
      password: password.value
    }
  })

  console.log('Login successful:', response)

  // Store JWT token
  if (response.accessToken) {
    localStorage.setItem('access_token', response.accessToken)
    localStorage.setItem('first_name', response.user.first_name)
  }

  

  // Redirect after successful login
  await navigateTo('/dashboard')
  } catch (err) {
    error.value = 'Unable to login. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="auth-page">

    <!-- Left Side -->
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
          Prepare smarter.<br />
          <span>Interview better.</span>
        </h1>

        <p>
          Practice realistic technical interviews with AI,
          improve your answers, and build confidence for your next opportunity.
        </p>

        <div class="features">
          <div class="feature">
            <div class="feature-icon">✓</div>
            <div>
              <strong>AI-powered interviews</strong>
              <span>Real-time intelligent feedback</span>
            </div>
          </div>

          <div class="feature">
            <div class="feature-icon">✓</div>
            <div>
              <strong>Track your progress</strong>
              <span>See how your skills improve</span>
            </div>
          </div>

          <div class="feature">
            <div class="feature-icon">✓</div>
            <div>
              <strong>Practice anytime</strong>
              <span>No interviewer required</span>
            </div>
          </div>
        </div>
      </div>

      <div class="copyright">
        © {{ new Date().getFullYear() }} AI Interviewer. All rights reserved.
      </div>
    </div>

    <!-- Right Side -->
    <div class="auth-right">
      <div class="auth-container">

        <div class="mobile-brand">
          <div class="brand-icon">AI</div>
          <span>AI Interviewer</span>
        </div>

        <div class="form-header">
          <h2>Welcome back</h2>
          <p>Sign in to continue your interview practice.</p>
        </div>

        <!-- Error -->
        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <form @submit.prevent="login">

          <!-- Email -->
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

          <!-- Password -->
          <div class="form-group">
            <div class="label-row">
              <label for="password">Password</label>

              <a href="#" @click.prevent>
                Forgot password?
              </a>
            </div>

            <div class="input-wrapper">
              <span class="input-icon">🔒</span>

              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
                autocomplete="current-password"
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

          <!-- Remember -->
          <div class="remember-row">
            <label class="checkbox-label">
              <input
                v-model="rememberMe"
                type="checkbox"
              />
              <span>Remember me</span>
            </label>
          </div>

          <!-- Login -->
          <button
            type="submit"
            class="login-button"
            :disabled="isLoading"
          >
            <span v-if="isLoading">Signing in...</span>
            <span v-else>Sign in →</span>
          </button>
        </form>

        <div class="divider">
          <span>OR</span>
        </div>

        <!-- Google -->
        <button
          type="button"
          class="google-button"
          @click="console.log('Google login - coming soon')"
        >
          <span class="google-icon">G</span>
          Continue with Google
        </button>

        <div class="register-link">
          Don't have an account?
          <NuxtLink to="/register">
            Create an account
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
  font-size: clamp(42px, 5vw, 66px);
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

.form-header {
  margin-bottom: 32px;
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
  margin-bottom: 21px;
}

.form-group label {
  display: block;
  color: #374151;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
}

.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label-row a {
  color: #6366f1;
  font-size: 13px;
  text-decoration: none;
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

.remember-row {
  margin: 2px 0 22px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6b7280;
  font-size: 13px;
  cursor: pointer;
}

.checkbox-label input {
  width: 15px;
  height: 15px;
  accent-color: #6366f1;
}

.login-button {
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

.login-button:hover {
  background: #4f46e5;
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* DIVIDER */

.divider {
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 26px 0;
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

/* REGISTER */

.register-link {
  text-align: center;
  margin-top: 28px;
  color: #6b7280;
  font-size: 14px;
}

.register-link a {
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
    margin-bottom: 55px;
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
    margin-bottom: 40px;
  }
}
</style>