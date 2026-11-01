export function triggerHaptic(pattern = 'light') {
  if ('vibrate' in navigator) {
    const patterns = {
      light: [10],
      medium: [50],
      heavy: [100],
      success: [50, 50, 50],
      error: [100, 50, 100],
      warning: [50, 100],
    }
    navigator.vibrate(patterns[pattern] || patterns.light)
  }
}
