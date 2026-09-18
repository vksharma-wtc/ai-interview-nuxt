<script setup lang="ts">
const { user } = useAuth()

const first_name = ref('')
onMounted(() => {
  first_name.value = localStorage.getItem('first_name') || ''
})

console.log('dddddddddddddddddddddddddddddd')

const stats = [
  {
    label: 'Interviews Completed',
    value: '12',
    change: '+3 this month',
    icon: '🎤'
  },
  {
    label: 'Average Score',
    value: '82%',
    change: '+6% from last month',
    icon: '📊'
  },
  {
    label: 'Questions Answered',
    value: '68',
    change: '+18 this month',
    icon: '💬'
  },
  {
    label: 'Practice Time',
    value: '4h 32m',
    change: '+48m this month',
    icon: '⏱'
  }
]

const recentInterviews = [
  {
    id: 1,
    role: 'Senior PHP Developer',
    type: 'Technical Interview',
    date: 'Today',
    score: 88,
    questions: 10,
    status: 'Completed'
  },
  {
    id: 2,
    role: 'Magento 2 Developer',
    type: 'Technical Interview',
    date: 'Yesterday',
    score: 82,
    questions: 10,
    status: 'Completed'
  },
  {
    id: 3,
    role: 'Full Stack Developer',
    type: 'Technical Interview',
    date: 'Sep 3, 2026',
    score: 76,
    questions: 8,
    status: 'Completed'
  },
  {
    id: 4,
    role: 'Laravel Developer',
    type: 'Technical Interview',
    date: 'Sep 1, 2026',
    score: 81,
    questions: 10,
    status: 'Completed'
  }
]

const skills = [
  {
    name: 'Technical Knowledge',
    score: 88
  },
  {
    name: 'Communication',
    score: 78
  },
  {
    name: 'Problem Solving',
    score: 84
  },
  {
    name: 'System Design',
    score: 72
  }
]

const startInterview = () => {
  navigateTo('/interview')
}

const viewInterview = (id: number) => {
  navigateTo(`/result?id=${id}`)
}

const viewAllInterviews = () => {
  navigateTo('/interviews')
}

const logout = () => {
  navigateTo('/')
}
</script>

<template>
  <div class="dashboard-page">

    <!-- Sidebar -->
    <aside class="sidebar">

      <div class="sidebar-top">

        <NuxtLink to="/" class="logo">
          <span class="logo-icon">AI</span>

          <span>
            Interviewer
          </span>
        </NuxtLink>

        <nav class="navigation">

          <NuxtLink
            to="/dashboard"
            class="nav-item active"
          >
            <span class="nav-icon">▦</span>
            Dashboard
          </NuxtLink>

          <NuxtLink
            to="/interview"
            class="nav-item"
          >
            <span class="nav-icon">🎤</span>
            New Interview
          </NuxtLink>

          <NuxtLink
            to="/interviews"
            class="nav-item"
          >
            <span class="nav-icon">▤</span>
            My Interviews
          </NuxtLink>

          <NuxtLink
            to="/result"
            class="nav-item"
          >
            <span class="nav-icon">📊</span>
            Results
          </NuxtLink>

        </nav>

      </div>

      <div class="sidebar-bottom">

        <div class="upgrade-card">

          <div class="upgrade-icon">
            ⭐
          </div>

          <h3>
            Upgrade to Pro
          </h3>

          <p>
            Get unlimited interviews and advanced AI feedback.
          </p>

          <button
            type="button"
            class="upgrade-btn"
          >
            Upgrade
          </button>

        </div>

        <button
          type="button"
          class="logout-btn"
          @click="logout"
        >
          <span>↪</span>
          Sign Out
        </button>

      </div>

    </aside>

    <!-- Main Content -->
    <main class="main-content">

      <!-- Top Header -->
      <header class="top-header">

        <div class="mobile-logo">
          <span class="logo-icon">AI</span>
          Interviewer
        </div>

        <div class="header-actions">

          <button
            type="button"
            class="notification-btn"
          >
            🔔
            <span class="notification-dot"></span>
          </button>

          <div class="user-profile">

            <div class="user-avatar">
              C
            </div>

            <div class="user-info">
              <strong>
                Welcome, {{ first_name}}
              </strong>

              <span>
                Free Plan
              </span>
            </div>

          </div>

        </div>

      </header>

      <!-- Dashboard -->
      <div class="dashboard-container">

        <!-- Welcome -->
        <section class="welcome-section">

          <div>

            <span class="welcome-label">
              DASHBOARD
            </span>

            <h1>
              Welcome back! 👋
            </h1>

            <p>
              Keep practicing and improve your interview performance.
            </p>

          </div>

          <button
            type="button"
            class="primary-btn"
            @click="startInterview"
          >
            <span>＋</span>
            Start New Interview
          </button>

        </section>

        <!-- Stats -->
        <section class="stats-grid">

          <div
            v-for="stat in stats"
            :key="stat.label"
            class="stat-card"
          >

            <div class="stat-card-top">

              <div class="stat-icon">
                {{ stat.icon }}
              </div>

              <span class="stat-change">
                {{ stat.change }}
              </span>

            </div>

            <div class="stat-value">
              {{ stat.value }}
            </div>

            <div class="stat-label">
              {{ stat.label }}
            </div>

          </div>

        </section>

        <!-- Main Grid -->
        <section class="dashboard-grid">

          <!-- Recent Interviews -->
          <div class="recent-card">

            <div class="card-header">

              <div>
                <h2>
                  Recent Interviews
                </h2>

                <p>
                  Your latest interview sessions
                </p>
              </div>

              <button
                type="button"
                class="view-all"
                @click="viewAllInterviews"
              >
                View All →
              </button>

            </div>

            <div class="interview-list">

              <div
                v-for="interview in recentInterviews"
                :key="interview.id"
                class="interview-item"
                @click="viewInterview(interview.id)"
              >

                <div class="interview-role-icon">
                  💼
                </div>

                <div class="interview-info">

                  <h3>
                    {{ interview.role }}
                  </h3>

                  <p>
                    {{ interview.type }}
                    ·
                    {{ interview.questions }} questions
                  </p>

                </div>

                <div class="interview-date">
                  {{ interview.date }}
                </div>

                <div class="interview-score">

                  <strong>
                    {{ interview.score }}%
                  </strong>

                  <span>
                    Score
                  </span>

                </div>

                <div class="interview-status">
                  {{ interview.status }}
                </div>

                <div class="interview-arrow">
                  →
                </div>

              </div>

            </div>

          </div>

          <!-- Skill Performance -->
          <div class="skills-card">

            <div class="card-header">

              <div>
                <h2>
                  Skill Performance
                </h2>

                <p>
                  Your current strengths
                </p>
              </div>

            </div>

            <div class="skills-list">

              <div
                v-for="skill in skills"
                :key="skill.name"
                class="skill"
              >

                <div class="skill-top">

                  <span>
                    {{ skill.name }}
                  </span>

                  <strong>
                    {{ skill.score }}%
                  </strong>

                </div>

                <div class="skill-bar">

                  <div
                    class="skill-fill"
                    :style="{
                      width: `${skill.score}%`
                    }"
                  ></div>

                </div>

              </div>

            </div>

            <button
              type="button"
              class="practice-btn"
              @click="startInterview"
            >
              Practice Weak Areas →
            </button>

          </div>

        </section>

        <!-- Quick Actions -->
        <section class="quick-section">

          <div class="section-title">

            <div>
              <h2>
                Quick Start
              </h2>

              <p>
                Choose an interview and start practicing.
              </p>
            </div>

          </div>

          <div class="quick-grid">

            <button
              type="button"
              class="quick-card"
              @click="startInterview"
            >

              <div class="quick-icon">
                💻
              </div>

              <div>
                <h3>
                  Technical Interview
                </h3>

                <p>
                  Test your technical knowledge
                </p>
              </div>

              <span class="quick-arrow">
                →
              </span>

            </button>

            <button
              type="button"
              class="quick-card"
              @click="startInterview"
            >

              <div class="quick-icon">
                🧠
              </div>

              <div>
                <h3>
                  System Design
                </h3>

                <p>
                  Practice architecture questions
                </p>
              </div>

              <span class="quick-arrow">
                →
              </span>

            </button>

            <button
              type="button"
              class="quick-card"
              @click="startInterview"
            >

              <div class="quick-icon">
                💬
              </div>

              <div>
                <h3>
                  Behavioral Interview
                </h3>

                <p>
                  Improve communication skills
                </p>
              </div>

              <span class="quick-arrow">
                →
              </span>

            </button>

          </div>

        </section>

        <!-- Practice CTA -->
        <section class="practice-banner">

          <div class="practice-content">

            <span class="practice-label">
              KEEP IMPROVING
            </span>

            <h2>
              Your next interview could be your best one.
            </h2>

            <p>
              Practice regularly and use AI feedback to
              identify and improve your weak areas.
            </p>

            <button
              type="button"
              class="practice-primary"
              @click="startInterview"
            >
              Start Practice Interview →
            </button>

          </div>

          <div class="practice-visual">
            🤖
          </div>

        </section>

      </div>

    </main>

  </div>
</template>

<style scoped>
.dashboard-page {
  min-height: 100vh;
  background: #f8fafc;
  color: #111827;

  display: flex;
}

/* =====================================
   SIDEBAR
===================================== */

.sidebar {
  width: 250px;

  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 24px 16px;

  background: #ffffff;

  border-right: 1px solid #e5e7eb;

  box-sizing: border-box;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 0 10px;

  color: #111827;

  text-decoration: none;

  font-size: 18px;
  font-weight: 800;
}

.logo-icon {
  width: 35px;
  height: 35px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 9px;

  background: #2563eb;
  color: #ffffff;

  font-size: 12px;
  font-weight: 800;
}

.navigation {
  display: flex;
  flex-direction: column;

  gap: 5px;

  margin-top: 45px;
}

.nav-item {
  display: flex;
  align-items: center;

  gap: 12px;

  padding: 12px;

  border-radius: 9px;

  color: #64748b;

  text-decoration: none;

  font-size: 14px;
  font-weight: 600;
}

.nav-item:hover {
  background: #f8fafc;
  color: #111827;
}

.nav-item.active {
  background: #eff6ff;
  color: #2563eb;
}

.nav-icon {
  width: 22px;

  text-align: center;

  font-size: 16px;
}

.upgrade-card {
  margin: 0 0 18px;

  padding: 18px;

  background: #f8fafc;

  border: 1px solid #e2e8f0;

  border-radius: 14px;
}

.upgrade-icon {
  margin-bottom: 10px;

  font-size: 20px;
}

.upgrade-card h3 {
  margin: 0 0 7px;

  font-size: 14px;
}

.upgrade-card p {
  margin: 0 0 14px;

  color: #64748b;

  font-size: 11px;
  line-height: 1.5;
}

.upgrade-btn {
  width: 100%;

  padding: 9px;

  border: none;
  border-radius: 8px;

  background: #111827;
  color: #ffffff;

  font-size: 12px;
  font-weight: 700;

  cursor: pointer;
}

.logout-btn {
  width: 100%;

  display: flex;
  align-items: center;

  gap: 10px;

  padding: 11px;

  border: none;

  background: transparent;

  color: #64748b;

  font-size: 13px;
  font-weight: 600;

  cursor: pointer;

  text-align: left;
}

/* =====================================
   MAIN
===================================== */

.main-content {
  width: calc(100% - 250px);

  margin-left: 250px;
}

/* =====================================
   HEADER
===================================== */

.top-header {
  height: 70px;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  padding: 0 35px;

  background: #ffffff;

  border-bottom: 1px solid #e5e7eb;

  box-sizing: border-box;
}

.mobile-logo {
  display: none;
}

.header-actions {
  display: flex;
  align-items: center;

  gap: 25px;
}

.notification-btn {
  position: relative;

  border: none;

  background: transparent;

  font-size: 18px;

  cursor: pointer;
}

.notification-dot {
  width: 6px;
  height: 6px;

  position: absolute;
  top: 1px;
  right: 0;

  border-radius: 50%;

  background: #2563eb;
}

.user-profile {
  display: flex;
  align-items: center;

  gap: 10px;
}

.user-avatar {
  width: 36px;
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: #eff6ff;
  color: #2563eb;

  font-size: 13px;
  font-weight: 800;
}

.user-info strong,
.user-info span {
  display: block;
}

.user-info strong {
  font-size: 13px;
}

.user-info span {
  margin-top: 2px;

  color: #94a3b8;

  font-size: 10px;
}

/* =====================================
   DASHBOARD
===================================== */

.dashboard-container {
  max-width: 1250px;

  margin: auto;

  padding: 35px;
}

/* Welcome */

.welcome-section {
  display: flex;

  align-items: center;
  justify-content: space-between;

  margin-bottom: 30px;
}

.welcome-label {
  color: #2563eb;

  font-size: 10px;
  font-weight: 800;

  letter-spacing: 1px;
}

.welcome-section h1 {
  margin: 6px 0 7px;

  font-size: 30px;
}

.welcome-section p {
  margin: 0;

  color: #64748b;

  font-size: 14px;
}

.primary-btn {
  display: flex;
  align-items: center;

  gap: 8px;

  padding: 12px 18px;

  border: none;
  border-radius: 9px;

  background: #2563eb;
  color: #ffffff;

  font-size: 13px;
  font-weight: 700;

  cursor: pointer;
}

.primary-btn:hover {
  background: #1d4ed8;
}

/* =====================================
   STATS
===================================== */

.stats-grid {
  display: grid;

  grid-template-columns: repeat(4, 1fr);

  gap: 18px;

  margin-bottom: 30px;
}

.stat-card {
  padding: 20px;

  background: #ffffff;

  border: 1px solid #e5e7eb;

  border-radius: 14px;
}

.stat-card-top {
  display: flex;

  justify-content: space-between;
  align-items: center;

  margin-bottom: 15px;
}

.stat-icon {
  width: 38px;
  height: 38px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #f8fafc;

  border-radius: 9px;

  font-size: 17px;
}

.stat-change {
  color: #16a34a;

  font-size: 10px;
  font-weight: 600;
}

.stat-value {
  font-size: 25px;
  font-weight: 800;
}

.stat-label {
  margin-top: 4px;

  color: #64748b;

  font-size: 12px;
}

/* =====================================
   DASHBOARD GRID
===================================== */

.dashboard-grid {
  display: grid;

  grid-template-columns: 1.7fr 1fr;

  gap: 20px;

  margin-bottom: 35px;
}

.recent-card,
.skills-card {
  background: #ffffff;

  border: 1px solid #e5e7eb;

  border-radius: 15px;

  overflow: hidden;
}

.card-header {
  display: flex;

  justify-content: space-between;
  align-items: flex-start;

  padding: 22px;

  border-bottom: 1px solid #f1f5f9;
}

.card-header h2 {
  margin: 0;

  font-size: 17px;
}

.card-header p {
  margin: 5px 0 0;

  color: #94a3b8;

  font-size: 11px;
}

.view-all {
  border: none;

  background: transparent;

  color: #2563eb;

  font-size: 11px;
  font-weight: 700;

  cursor: pointer;
}

/* Interviews */

.interview-item {
  display: grid;

  grid-template-columns: 42px 1fr 80px 55px 75px 20px;

  gap: 12px;

  align-items: center;

  padding: 16px 20px;

  border-bottom: 1px solid #f1f5f9;

  cursor: pointer;

  transition: background 0.15s;
}

.interview-item:last-child {
  border-bottom: none;
}

.interview-item:hover {
  background: #f8fafc;
}

.interview-role-icon {
  width: 38px;
  height: 38px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #eff6ff;

  border-radius: 9px;

  font-size: 17px;
}

.interview-info h3 {
  margin: 0;

  font-size: 13px;
}

.interview-info p {
  margin: 4px 0 0;

  color: #94a3b8;

  font-size: 10px;
}

.interview-date {
  color: #64748b;

  font-size: 10px;
}

.interview-score strong {
  display: block;

  color: #2563eb;

  font-size: 14px;
}

.interview-score span {
  color: #94a3b8;

  font-size: 9px;
}

.interview-status {
  padding: 5px 7px;

  background: #dcfce7;

  border-radius: 20px;

  color: #15803d;

  font-size: 8px;
  font-weight: 700;

  text-align: center;
}

.interview-arrow {
  color: #94a3b8;

  font-size: 14px;
}

/* =====================================
   SKILLS
===================================== */

.skills-list {
  padding: 22px;
}

.skill {
  margin-bottom: 21px;
}

.skill:last-child {
  margin-bottom: 0;
}

.skill-top {
  display: flex;

  justify-content: space-between;

  margin-bottom: 8px;

  color: #475569;

  font-size: 11px;
}

.skill-top strong {
  color: #111827;
}

.skill-bar {
  height: 7px;

  overflow: hidden;

  background: #e2e8f0;

  border-radius: 20px;
}

.skill-fill {
  height: 100%;

  background: #2563eb;

  border-radius: 20px;
}

.practice-btn {
  width: calc(100% - 44px);

  margin: 0 22px 22px;

  padding: 11px;

  border: 1px solid #dbeafe;

  border-radius: 9px;

  background: #eff6ff;

  color: #2563eb;

  font-size: 11px;
  font-weight: 700;

  cursor: pointer;
}

/* =====================================
   QUICK START
===================================== */

.quick-section {
  margin-bottom: 35px;
}

.section-title {
  margin-bottom: 18px;
}

.section-title h2 {
  margin: 0;

  font-size: 19px;
}

.section-title p {
  margin: 5px 0 0;

  color: #94a3b8;

  font-size: 12px;
}

.quick-grid {
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 15px;
}

.quick-card {
  display: flex;
  align-items: center;

  gap: 13px;

  padding: 18px;

  border: 1px solid #e5e7eb;

  border-radius: 13px;

  background: #ffffff;

  text-align: left;

  cursor: pointer;

  transition: 0.2s;
}

.quick-card:hover {
  border-color: #bfdbfe;

  transform: translateY(-2px);
}

.quick-icon {
  width: 40px;
  height: 40px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #f8fafc;

  border-radius: 9px;

  font-size: 18px;
}

.quick-card h3 {
  margin: 0;

  font-size: 13px;
}

.quick-card p {
  margin: 4px 0 0;

  color: #94a3b8;

  font-size: 10px;
}

.quick-arrow {
  margin-left: auto;

  color: #2563eb;

  font-weight: 700;
}

/* =====================================
   PRACTICE BANNER
===================================== */

.practice-banner {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;

  overflow: hidden;

  padding: 35px;

  background: #111827;

  border-radius: 17px;

  color: #ffffff;
}

.practice-content {
  max-width: 650px;
}

.practice-label {
  color: #93c5fd;

  font-size: 10px;
  font-weight: 800;

  letter-spacing: 1px;
}

.practice-content h2 {
  margin: 7px 0;

  font-size: 24px;
}

.practice-content p {
  margin: 0 0 20px;

  color: #cbd5e1;

  font-size: 12px;
  line-height: 1.6;
}

.practice-primary {
  padding: 11px 17px;

  border: none;
  border-radius: 8px;

  background: #2563eb;
  color: #ffffff;

  font-size: 12px;
  font-weight: 700;

  cursor: pointer;
}

.practice-visual {
  width: 110px;
  height: 110px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: #1e293b;

  font-size: 55px;
}

/* =====================================
   RESPONSIVE
===================================== */

@media (max-width: 1100px) {

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .quick-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 800px) {

  .sidebar {
    display: none;
  }

  .main-content {
    width: 100%;
    margin-left: 0;
  }

  .top-header {
    justify-content: space-between;

    padding: 0 20px;
  }

  .mobile-logo {
    display: flex;
    align-items: center;

    gap: 8px;

    font-size: 16px;
    font-weight: 800;
  }

  .mobile-logo .logo-icon {
    width: 30px;
    height: 30px;
  }

  .dashboard-container {
    padding: 25px 20px 50px;
  }

  .welcome-section {
    flex-direction: column;

    align-items: flex-start;

    gap: 20px;
  }

  .primary-btn {
    width: 100%;
    justify-content: center;
  }

  .interview-item {
    grid-template-columns: 42px 1fr 55px;

    gap: 10px;
  }

  .interview-date,
  .interview-status {
    display: none;
  }

  .interview-score {
    text-align: right;
  }
}

@media (max-width: 550px) {

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .welcome-section h1 {
    font-size: 25px;
  }

  .header-actions {
    gap: 10px;
  }

  .user-info {
    display: none;
  }

  .practice-banner {
    padding: 25px;

    flex-direction: column;

    align-items: flex-start;

    gap: 25px;
  }

  .practice-visual {
    width: 75px;
    height: 75px;

    font-size: 35px;
  }

  .interview-info h3 {
    font-size: 12px;
  }

  .interview-info p {
    font-size: 9px;
  }
}
</style>