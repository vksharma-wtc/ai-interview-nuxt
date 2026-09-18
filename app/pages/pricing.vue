<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'default'
})

const billing = ref<'monthly' | 'yearly'>('monthly')

const plans = [
  {
    name: 'Free',
    description: 'Get started with AI interview practice.',
    monthly: 0,
    yearly: 0,
    popular: false,
    features: [
      '3 AI interviews per month',
      'Basic technical questions',
      'AI-generated feedback',
      'Basic interview score',
      'Interview history'
    ],
    button: 'Start for free'
  },
  {
    name: 'Pro',
    description: 'For developers serious about getting hired.',
    monthly: 499,
    yearly: 399,
    popular: true,
    features: [
      'Unlimited AI interviews',
      'Technical & behavioral interviews',
      'Detailed AI feedback',
      'Skill-wise scoring',
      'Interview history',
      'Personalized improvement tips',
      'Advanced interview reports'
    ],
    button: 'Start Pro'
  },
  {
    name: 'Business',
    description: 'For teams hiring and assessing developers.',
    monthly: 1499,
    yearly: 1199,
    popular: false,
    features: [
      'Everything in Pro',
      'Developer assessments',
      'Team dashboard',
      'Candidate management',
      'Custom assessments',
      'Candidate reports',
      'Team analytics'
    ],
    button: 'Contact us'
  }
]

function selectPlan(plan: any) {
  if (plan.name === 'Free') {
    navigateTo('/register')
    return
  }

  if (plan.name === 'Business') {
    console.log('Business plan selected')
    return
  }

  console.log('Pro plan selected')

  // Later:
  // navigateTo('/checkout')
}
</script>

<template>
  <div class="pricing-page">

    <!-- HERO -->

    <section class="pricing-hero">

      <div class="hero-badge">
        Simple & transparent pricing
      </div>

      <h1>
        Invest in your
        <span>interview success.</span>
      </h1>

      <p>
        Start practicing for free. Upgrade when you need
        unlimited AI-powered interview preparation.
      </p>

      <!-- BILLING TOGGLE -->

      <div class="billing-toggle">

        <button
          :class="{ active: billing === 'monthly' }"
          @click="billing = 'monthly'"
        >
          Monthly
        </button>

        <button
          :class="{ active: billing === 'yearly' }"
          @click="billing = 'yearly'"
        >
          Yearly

          <span class="save-badge">
            Save 20%
          </span>
        </button>

      </div>

    </section>

    <!-- PRICING CARDS -->

    <section class="pricing-section">

      <div class="pricing-grid">

        <div
          v-for="plan in plans"
          :key="plan.name"
          class="pricing-card"
          :class="{ popular: plan.popular }"
        >

          <!-- POPULAR -->

          <div
            v-if="plan.popular"
            class="popular-badge"
          >
            MOST POPULAR
          </div>

          <!-- PLAN HEADER -->

          <div class="plan-header">

            <h2>
              {{ plan.name }}
            </h2>

            <p>
              {{ plan.description }}
            </p>

          </div>

          <!-- PRICE -->

          <div class="price">

            <span class="currency">
              ₹
            </span>

            <span class="amount">
              {{ billing === 'monthly'
                ? plan.monthly
                : plan.yearly }}
            </span>

            <span
              v-if="plan.monthly !== 0"
              class="period"
            >
              /month
            </span>

          </div>

          <div
            v-if="billing === 'yearly' && plan.monthly !== 0"
            class="yearly-note"
          >
            Billed annually
          </div>

          <!-- BUTTON -->

          <button
            class="plan-button"
            :class="{
              primary: plan.popular,
              secondary: !plan.popular
            }"
            @click="selectPlan(plan)"
          >
            {{ plan.button }}

            <span>→</span>
          </button>

          <!-- FEATURES -->

          <div class="features-title">
            What's included:
          </div>

          <ul class="features">

            <li
              v-for="feature in plan.features"
              :key="feature"
            >
              <span class="check">
                ✓
              </span>

              <span>
                {{ feature }}
              </span>
            </li>

          </ul>

        </div>

      </div>

    </section>

    <!-- COMPARISON -->

    <section class="comparison-section">

      <div class="section-header">

        <div class="section-badge">
          Compare plans
        </div>

        <h2>
          Choose the right plan for you
        </h2>

        <p>
          Everything you need to prepare confidently
          for your next interview.
        </p>

      </div>

      <div class="comparison-table">

        <div class="table-row table-header">

          <div>
            Feature
          </div>

          <div>
            Free
          </div>

          <div>
            Pro
          </div>

          <div>
            Business
          </div>

        </div>

        <div class="table-row">

          <div>
            AI Interviews
          </div>

          <div>
            3 / month
          </div>

          <div>
            Unlimited
          </div>

          <div>
            Unlimited
          </div>

        </div>

        <div class="table-row">

          <div>
            Technical Interviews
          </div>

          <div>✓</div>
          <div>✓</div>
          <div>✓</div>

        </div>

        <div class="table-row">

          <div>
            Behavioral Interviews
          </div>

          <div>—</div>
          <div>✓</div>
          <div>✓</div>

        </div>

        <div class="table-row">

          <div>
            Detailed AI Feedback
          </div>

          <div>Basic</div>
          <div>✓</div>
          <div>✓</div>

        </div>

        <div class="table-row">

          <div>
            Skill Analytics
          </div>

          <div>—</div>
          <div>✓</div>
          <div>✓</div>

        </div>

        <div class="table-row">

          <div>
            Team Dashboard
          </div>

          <div>—</div>
          <div>—</div>
          <div>✓</div>

        </div>

      </div>

    </section>

    <!-- FAQ -->

    <section class="faq-section">

      <div class="section-header">

        <div class="section-badge">
          FAQ
        </div>

        <h2>
          Frequently asked questions
        </h2>

      </div>

      <div class="faq-grid">

        <div class="faq-item">
          <h3>
            Can I start for free?
          </h3>

          <p>
            Yes. You can create an account and complete
            up to 3 AI interviews every month for free.
          </p>
        </div>

        <div class="faq-item">
          <h3>
            Can I cancel anytime?
          </h3>

          <p>
            Yes. Pro subscriptions can be cancelled
            at any time.
          </p>
        </div>

        <div class="faq-item">
          <h3>
            What types of interviews are supported?
          </h3>

          <p>
            You can practice technical, behavioral,
            system design and developer-focused interviews.
          </p>
        </div>

        <div class="faq-item">
          <h3>
            Is the AI feedback personalized?
          </h3>

          <p>
            Yes. The AI analyzes your answer and provides
            feedback based on clarity, technical knowledge,
            problem solving and communication.
          </p>
        </div>

      </div>

    </section>

    <!-- CTA -->

    <section class="cta-section">

      <div class="cta-box">

        <div class="cta-content">

          <div class="cta-badge">
            Start today
          </div>

          <h2>
            Ready to become
            interview-ready?
          </h2>

          <p>
            Create your free account and start your
            first AI-powered interview today.
          </p>

          <div class="cta-actions">

            <NuxtLink
              to="/register"
              class="cta-primary"
            >
              Start Free Interview →
            </NuxtLink>

            <NuxtLink
              to="/login"
              class="cta-secondary"
            >
              Already have an account?
            </NuxtLink>

          </div>

        </div>

      </div>

    </section>

  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.pricing-page {
  min-height: 100vh;
  background: #ffffff;
  color: #111827;
  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
}

/* HERO */

.pricing-hero {
  text-align: center;
  padding: 90px 24px 60px;
  background: #f9fafb;
}

.hero-badge,
.section-badge,
.cta-badge {
  display: inline-flex;
  align-items: center;
  padding: 7px 13px;
  border-radius: 30px;
  background: #eef2ff;
  color: #6366f1;
  font-size: 12px;
  font-weight: 700;
}

.pricing-hero h1 {
  max-width: 760px;
  margin: 22px auto 18px;

  font-size: clamp(42px, 6vw, 68px);
  line-height: 1.05;
  letter-spacing: -2.5px;
}

.pricing-hero h1 span {
  color: #6366f1;
}

.pricing-hero > p {
  max-width: 600px;
  margin: 0 auto;

  color: #6b7280;
  font-size: 17px;
  line-height: 1.7;
}

/* BILLING */

.billing-toggle {
  display: inline-flex;
  align-items: center;

  margin-top: 35px;
  padding: 5px;

  border: 1px solid #e5e7eb;
  border-radius: 12px;

  background: white;
}

.billing-toggle button {
  border: none;
  background: transparent;

  padding: 10px 17px;

  border-radius: 8px;

  color: #6b7280;

  font-size: 13px;
  font-weight: 600;

  cursor: pointer;
}

.billing-toggle button.active {
  background: #111827;
  color: white;
}

.save-badge {
  margin-left: 6px;
  color: #86efac;
  font-size: 10px;
}

/* PRICING */

.pricing-section {
  padding: 70px 24px;
}

.pricing-grid {
  max-width: 1150px;
  margin: 0 auto;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.pricing-card {
  position: relative;

  padding: 34px 30px;

  border: 1px solid #e5e7eb;
  border-radius: 18px;

  background: white;

  box-shadow:
    0 10px 30px rgba(17, 24, 39, 0.04);
}

.pricing-card.popular {
  border: 2px solid #6366f1;
  transform: translateY(-8px);
}

.popular-badge {
  position: absolute;
  top: -13px;
  left: 50%;
  transform: translateX(-50%);

  padding: 6px 13px;

  border-radius: 20px;

  background: #6366f1;
  color: white;

  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.5px;
}

.plan-header h2 {
  margin: 0 0 8px;

  font-size: 24px;
}

.plan-header p {
  min-height: 45px;

  color: #6b7280;
  font-size: 13px;
  line-height: 1.6;
}

/* PRICE */

.price {
  display: flex;
  align-items: baseline;

  margin: 28px 0 5px;
}

.currency {
  font-size: 20px;
  font-weight: 700;
}

.amount {
  font-size: 48px;
  line-height: 1;
  font-weight: 800;
  letter-spacing: -2px;
}

.period {
  margin-left: 5px;
  color: #6b7280;
  font-size: 12px;
}

.yearly-note {
  height: 18px;

  color: #6366f1;
  font-size: 11px;
}

/* BUTTON */

.plan-button {
  width: 100%;
  height: 48px;

  margin: 24px 0 28px;

  border-radius: 9px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  font-size: 13px;
  font-weight: 700;

  cursor: pointer;

  transition: 0.2s;
}

.plan-button.primary {
  border: none;
  background: #6366f1;
  color: white;
}

.plan-button.primary:hover {
  background: #4f46e5;
}

.plan-button.secondary {
  border: 1px solid #d1d5db;
  background: white;
  color: #374151;
}

.plan-button.secondary:hover {
  border-color: #6366f1;
  color: #6366f1;
}

/* FEATURES */

.features-title {
  padding-bottom: 13px;

  border-bottom: 1px solid #f3f4f6;

  color: #374151;
  font-size: 12px;
  font-weight: 700;
}

.features {
  padding: 0;
  margin: 18px 0 0;

  list-style: none;

  display: flex;
  flex-direction: column;
  gap: 13px;
}

.features li {
  display: flex;
  align-items: flex-start;
  gap: 10px;

  color: #4b5563;

  font-size: 12px;
  line-height: 1.5;
}

.check {
  width: 18px;
  height: 18px;

  flex-shrink: 0;

  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #eef2ff;
  color: #6366f1;

  font-size: 10px;
  font-weight: 800;
}

/* COMPARISON */

.comparison-section {
  max-width: 1100px;
  margin: 0 auto;

  padding: 80px 24px;
}

.section-header {
  text-align: center;
  margin-bottom: 45px;
}

.section-header h2 {
  margin: 18px 0 10px;

  font-size: 38px;
  letter-spacing: -1.5px;
}

.section-header p {
  margin: 0;

  color: #6b7280;
  font-size: 15px;
}

.comparison-table {
  overflow: hidden;

  border: 1px solid #e5e7eb;
  border-radius: 14px;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);

  border-bottom: 1px solid #e5e7eb;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row > div {
  padding: 18px;

  color: #4b5563;

  font-size: 13px;
  text-align: center;
}

.table-row > div:first-child {
  text-align: left;
  color: #111827;
  font-weight: 600;
}

.table-header {
  background: #f9fafb;
}

.table-header > div {
  color: #111827;
  font-weight: 700;
}

/* FAQ */

.faq-section {
  background: #f9fafb;

  padding: 80px 24px;
}

.faq-grid {
  max-width: 900px;
  margin: 0 auto;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}

.faq-item {
  padding: 25px;

  border: 1px solid #e5e7eb;
  border-radius: 12px;

  background: white;
}

.faq-item h3 {
  margin: 0 0 10px;

  font-size: 15px;
}

.faq-item p {
  margin: 0;

  color: #6b7280;

  font-size: 13px;
  line-height: 1.7;
}

/* CTA */

.cta-section {
  padding: 80px 24px;
}

.cta-box {
  max-width: 1050px;
  margin: 0 auto;

  padding: 70px 50px;

  border-radius: 24px;

  background: #111827;
  color: white;

  text-align: center;
}

.cta-box h2 {
  max-width: 650px;

  margin: 20px auto 14px;

  font-size: clamp(34px, 5vw, 52px);
  line-height: 1.1;
  letter-spacing: -1.5px;
}

.cta-box p {
  max-width: 550px;

  margin: 0 auto;

  color: #9ca3af;

  font-size: 15px;
  line-height: 1.7;
}

.cta-actions {
  margin-top: 30px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.cta-primary {
  padding: 13px 21px;

  border-radius: 9px;

  background: #6366f1;
  color: white;

  text-decoration: none;

  font-size: 13px;
  font-weight: 700;
}

.cta-secondary {
  color: #d1d5db;

  text-decoration: none;

  font-size: 13px;
  font-weight: 600;
}

/* RESPONSIVE */

@media (max-width: 900px) {

  .pricing-grid {
    grid-template-columns: 1fr;
    max-width: 500px;
  }

  .pricing-card.popular {
    transform: none;
  }

  .faq-grid {
    grid-template-columns: 1fr;
    max-width: 600px;
  }

  .comparison-section {
    overflow-x: auto;
  }

  .comparison-table {
    min-width: 700px;
  }
}

@media (max-width: 600px) {

  .pricing-hero {
    padding: 65px 20px 45px;
  }

  .pricing-hero h1 {
    font-size: 42px;
  }

  .pricing-section {
    padding: 50px 18px;
  }

  .pricing-card {
    padding: 30px 24px;
  }

  .section-header h2 {
    font-size: 31px;
  }

  .cta-box {
    padding: 50px 25px;
  }

  .cta-actions {
    flex-direction: column;
  }

  .cta-primary,
  .cta-secondary {
    width: 100%;
  }
}
</style>