import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { getRouter } from './router'
import './styles.css'

async function bootstrap() {
  const router = getRouter()

  const root = document.getElementById('root')
  if (!root) {
    throw new Error('Root element not found')
  }

  createRoot(root).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  )
}

bootstrap().catch((err) => {
  console.error('Client bootstrap failed', err)
})
