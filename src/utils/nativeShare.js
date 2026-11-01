export async function nativeShare({ title, text, url }) {
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url })
      return true
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Share failed:', err)
      }
      return false
    }
  }
  return false
}
