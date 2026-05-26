// Client-side submission rate-limiter simulation
const requestLog = {}

/**
 * Validates request threshold. Returns true if request is permitted.
 */
export function checkRateLimit(actionKey, maxRequests = 3, timeSpanMs = 60000) {
  const now = Date.now()
  if (!requestLog[actionKey]) {
    requestLog[actionKey] = []
  }

  // Clear logs outside timeframe
  requestLog[actionKey] = requestLog[actionKey].filter(
    (time) => now - time < timeSpanMs
  )

  if (requestLog[actionKey].length >= maxRequests) {
    return false // Limit exceeded
  }

  requestLog[actionKey].push(now)
  return true
}

/**
 * Sanitizes input string to prevent script injections.
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return ''
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim()
}
