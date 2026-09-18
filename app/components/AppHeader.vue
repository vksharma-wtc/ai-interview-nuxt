<script setup lang="ts">
const mobileMenuOpen = ref(false)

function closeMenu() {
  mobileMenuOpen.value = false
}
</script>

<template>
  <header class="header">
    <div class="header-container">

      <!-- Logo -->
      <NuxtLink
        to="/"
        class="logo"
        @click="closeMenu"
      >
        <div class="logo-icon">
          AI
        </div>

        <span>AI Interviewer</span>
      </NuxtLink>

      <!-- Desktop Navigation -->
      <nav class="desktop-nav">

        <a href="#features">
          Features
        </a>

        <a href="#how-it-works">
          How It Works
        </a>

       
       <NuxtLink to="/pricing">
          Pricing
        </NuxtLink>

      </nav>

      <!-- Desktop Actions -->
      <div class="desktop-actions">

        <NuxtLink
          to="/login"
          class="login-link"
        >
          Login
        </NuxtLink>

        <NuxtLink
          to="/register"
          class="register-button"
        >
          Get Started
          <span>→</span>
        </NuxtLink>

      </div>

      <!-- Mobile Menu Button -->
      <button
        type="button"
        class="menu-button"
        @click="mobileMenuOpen = !mobileMenuOpen"
        aria-label="Toggle navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

    </div>

    <!-- Mobile Navigation -->
    <div
      v-if="mobileMenuOpen"
      class="mobile-menu"
    >

      <a
        href="#features"
        @click="closeMenu"
      >
        Features
      </a>

      <a
        href="#how-it-works"
        @click="closeMenu"
      >
        How It Works
      </a>

      <a
        href="#pricing"
        @click="closeMenu"
      >
        Pricing
      </a>

      <div class="mobile-divider"></div>

      <NuxtLink
        to="/login"
        class="mobile-login"
        @click="closeMenu"
      >
        Login
      </NuxtLink>

      <NuxtLink
        to="/register"
        class="mobile-register"
        @click="closeMenu"
      >
        Get Started →
      </NuxtLink>

    </div>

  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #e5e7eb;
}

.header-container {
  max-width: 1200px;
  height: 72px;
  margin: 0 auto;
  padding: 0 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* LOGO */

.logo {
  display: flex;
  align-items: center;
  gap: 11px;

  color: #111827;
  text-decoration: none;

  font-size: 19px;
  font-weight: 800;
  letter-spacing: -0.4px;
}

.logo-icon {
  width: 38px;
  height: 38px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;

  background: #6366f1;
  color: white;

  font-size: 12px;
  font-weight: 800;
}

/* DESKTOP NAV */

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 34px;

  margin-left: auto;
  margin-right: 40px;
}

.desktop-nav a {
  color: #4b5563;
  text-decoration: none;

  font-size: 14px;
  font-weight: 500;

  transition: color 0.2s;
}

.desktop-nav a:hover {
  color: #6366f1;
}

/* ACTIONS */

.desktop-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.login-link {
  color: #374151;
  text-decoration: none;

  font-size: 14px;
  font-weight: 600;

  transition: color 0.2s;
}

.login-link:hover {
  color: #6366f1;
}

.register-button {
  height: 42px;

  padding: 0 18px;

  display: flex;
  align-items: center;
  gap: 8px;

  border-radius: 9px;

  background: #6366f1;
  color: white;

  text-decoration: none;

  font-size: 13px;
  font-weight: 700;

  transition:
    background 0.2s,
    transform 0.2s;
}

.register-button:hover {
  background: #4f46e5;
  transform: translateY(-1px);
}

.register-button span {
  font-size: 16px;
}

/* MOBILE BUTTON */

.menu-button {
  display: none;

  width: 40px;
  height: 40px;

  padding: 8px;

  border: 1px solid #e5e7eb;
  border-radius: 8px;

  background: white;

  cursor: pointer;
}

.menu-button span {
  display: block;

  width: 100%;
  height: 2px;

  margin: 5px 0;

  background: #374151;
}

/* MOBILE MENU */

.mobile-menu {
  display: none;
}

/* RESPONSIVE */

@media (max-width: 800px) {

  .desktop-nav,
  .desktop-actions {
    display: none;
  }

  .menu-button {
    display: block;
  }

  .mobile-menu {
    display: flex;

    flex-direction: column;

    padding: 12px 24px 24px;

    background: white;

    border-top: 1px solid #f3f4f6;
  }

  .mobile-menu > a {
    padding: 14px 0;

    color: #374151;

    text-decoration: none;

    font-size: 15px;
    font-weight: 600;
  }

  .mobile-menu > a:hover {
    color: #6366f1;
  }

  .mobile-divider {
    height: 1px;
    background: #e5e7eb;
    margin: 8px 0 12px;
  }

  .mobile-login {
    text-align: center;

    border: 1px solid #d1d5db;
    border-radius: 9px;

    margin-bottom: 10px;
  }

  .mobile-register {
    text-align: center;

    border-radius: 9px;

    background: #6366f1;
    color: white !important;
  }
}

@media (max-width: 480px) {

  .header-container {
    height: 64px;
    padding: 0 18px;
  }

  .logo {
    font-size: 17px;
  }

  .logo-icon {
    width: 35px;
    height: 35px;
  }
}
</style>