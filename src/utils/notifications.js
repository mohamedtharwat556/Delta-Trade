export function requestNotificationPermission() {
  if (!('Notification' in window)) {
    return Promise.resolve({ granted: false, reason: 'not-supported' });
  }

  if (Notification.permission === 'granted') {
    return Promise.resolve({ granted: true });
  }

  if (Notification.permission !== 'denied') {
    return Notification.requestPermission().then((permission) => ({
      granted: permission === 'granted',
      reason: permission === 'denied' ? 'denied' : 'default',
    }));
  }

  return Promise.resolve({ granted: false, reason: 'denied' });
}

export function showNotification(title, options = {}) {
  if (!('Notification' in window) || Notification.permission !== 'granted') {
    return;
  }

  new Notification(title, {
    icon: '/favicon.png',
    badge: '/favicon.png',
    ...options,
  });
}

export function notifyNewOrder(orderNumber, customerName) {
  showNotification('طلب جديد!', {
    body: `طلب #${orderNumber} من ${customerName}`,
    tag: `order-${orderNumber}`,
    requireInteraction: true,
  });
}
