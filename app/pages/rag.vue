
<script setup lang="ts">
import { ref } from 'vue'

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
  sources?: unknown[]
}

const selectedFile = ref<File | null>(null)
const uploading = ref(false)
const asking = ref(false)
const question = ref('')
const error = ref('')
const uploadMessage = ref('')
const messages = ref<ChatMessage[]>([])

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  selectedFile.value = target.files?.[0] ?? null
  uploadMessage.value = ''
  error.value = ''
}

async function uploadDocument() {
  if (!selectedFile.value) {
    error.value = 'Please select a document first.'
    return
  }

  uploading.value = true
  error.value = ''
  uploadMessage.value = ''

  try {
    const formData = new FormData()
    formData.append('file', selectedFile.value)

    const result = await $fetch<{
      message?: string
    }>('/api/documents/upload', {
      method: 'POST',
      body: formData
    })

    uploadMessage.value =
      result.message || 'Document uploaded successfully.'

    selectedFile.value = null

    const input = document.querySelector<HTMLInputElement>(
      '#document-file'
    )
    if (input) input.value = ''
  } catch (err: any) {
    error.value =
      err?.data?.statusMessage ||
      err?.data?.message ||
      err?.message ||
      'Document upload failed.'
  } finally {
    uploading.value = false
  }
}

async function askQuestion() {
  const text = question.value.trim()

  if (!text) {
    error.value = 'Please enter a question.'
    return
  }

  messages.value.push({
    role: 'user',
    content: text
  })

  question.value = ''
  asking.value = true
  error.value = ''

  try {
    const result = await $fetch<{
      answer?: string
      sources?: unknown[]
    }>('/api/rag/ask', {
      method: 'POST',
      body: {
        question: text
      }
    })

    messages.value.push({
      role: 'assistant',
      content: result.answer || 'No answer was returned.',
      sources: result.sources
    })
  } catch (err: any) {
    error.value =
      err?.data?.statusMessage ||
      err?.data?.message ||
      err?.message ||
      'Could not get an answer. Please try again.'
  } finally {
    asking.value = false
  }
}
</script>

<template>
  <main class="rag-page">
    <header class="page-header">
      <h1>AI Document Assistant</h1>
      <p>
        Upload your knowledge documents and ask questions using AI.
      </p>
    </header>

    <section class="panel">
      <h2>1. Upload a document</h2>
      <p class="help-text">
        Select a supported file, then upload it to your RAG knowledge base.
      </p>

      <div class="upload-controls">
        <input
          id="document-file"
          type="file"
          accept=".txt,.pdf,.md,.csv"
          @change="onFileChange"
        />

        <button
          type="button"
          :disabled="uploading || !selectedFile"
          @click="uploadDocument"
        >
          {{ uploading ? 'Uploading...' : 'Upload document' }}
        </button>
      </div>

      <p v-if="selectedFile" class="help-text">
        Selected: {{ selectedFile.name }}
      </p>

      <p v-if="uploadMessage" class="success-message">
        {{ uploadMessage }}
      </p>
    </section>

    <section class="panel chat-panel">
      <h2>2. Ask a question</h2>
      <p class="help-text">
        Ask something related to the documents you uploaded.
      </p>

      <div class="chat-messages" aria-live="polite">
        <div v-if="messages.length === 0" class="empty-state">
          <p>Your conversation will appear here.</p>
          <p class="help-text">
            Example: What are the main marketing strategies in my documents?
          </p>
        </div>

        <article
          v-for="(message, index) in messages"
          :key="index"
          class="message"
          :class="message.role"
        >
          <strong>
            {{ message.role === 'user' ? 'You' : 'AI Assistant' }}
          </strong>

          <p class="message-content">{{ message.content }}</p>

          <details
            v-if="message.role === 'assistant' && message.sources?.length"
          >
            <summary>View retrieved sources</summary>
            <pre>{{ JSON.stringify(message.sources, null, 2) }}</pre>
          </details>
        </article>

        <div v-if="asking" class="message assistant">
          <strong>AI Assistant</strong>
          <p>Searching your documents and generating an answer...</p>
        </div>
      </div>

      <form class="question-form" @submit.prevent="askQuestion">
        <textarea
          v-model="question"
          placeholder="Ask a question about your documents..."
          rows="3"
          :disabled="asking"
          @keydown.enter.exact.prevent="askQuestion"
        />

        <button
          type="submit"
          :disabled="asking || !question.trim()"
        >
          {{ asking ? 'Thinking...' : 'Ask AI' }}
        </button>
      </form>
    </section>

    <p v-if="error" class="error-message" role="alert">
      {{ error }}
    </p>
  </main>
</template>

<style scoped>
.rag-page {
  max-width: 900px;
  margin: 40px auto;
  padding: 0 20px 40px;
  color: #1f2937;
  font-family: Arial, sans-serif;
}

.page-header {
  margin-bottom: 28px;
}

.page-header h1 {
  margin-bottom: 8px;
  font-size: 30px;
}

.page-header p,
.help-text {
  color: #6b7280;
  line-height: 1.6;
}

.panel {
  margin-bottom: 24px;
  padding: 24px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fff;
}

.panel h2 {
  margin-top: 0;
  font-size: 20px;
}

.upload-controls {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 18px;
}

input[type="file"] {
  max-width: 100%;
}

button {
  padding: 11px 18px;
  border: 0;
  border-radius: 8px;
  background: #2563eb;
  color: white;
  font-size: 14px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.success-message {
  color: #15803d;
}

.error-message {
  padding: 12px 16px;
  border-radius: 8px;
  background: #fef2f2;
  color: #b91c1c;
}

.chat-messages {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 180px;
  max-height: 450px;
  overflow-y: auto;
  margin: 20px 0;
  padding: 16px;
  border-radius: 10px;
  background: #f9fafb;
}

.empty-state {
  margin: auto;
  text-align: center;
}

.message {
  padding: 14px;
  border-radius: 10px;
  overflow-wrap: anywhere;
}

.message.user {
  align-self: flex-end;
  max-width: 85%;
  background: #dbeafe;
}

.message.assistant {
  align-self: flex-start;
  max-width: 95%;
  background: #fff;
  border: 1px solid #e5e7eb;
}

.message-content {
  white-space: pre-wrap;
  line-height: 1.6;
}

.message details {
  margin-top: 12px;
}

.message pre {
  max-width: 100%;
  overflow-x: auto;
  white-space: pre-wrap;
  font-size: 12px;
}

.question-form {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
}

.question-form textarea {
  box-sizing: border-box;
  width: 100%;
  padding: 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font: inherit;
  resize: vertical;
}

.question-form textarea:focus {
  outline: 2px solid #93c5fd;
  border-color: #2563eb;
}

@media (max-width: 600px) {
  .rag-page {
    margin-top: 24px;
    padding: 0 12px 24px;
  }

  .panel {
    padding: 16px;
  }

  .upload-controls {
    align-items: stretch;
    flex-direction: column;
  }

  .upload-controls button {
    width: 100%;
  }
}
</style>
