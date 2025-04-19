/**
 * ToastType defines the type of toast notification.
 */
export type ToastType = 'success' | 'error' | 'info';

/**
 * Shows a toast notification (simple implementation).
 * In production, use a robust toast library.
 */
export function showToast(message: string, type: ToastType = 'info'): void {
  // Simple browser alert fallback (replace with custom UI/toast lib as needed)
  if (typeof window !== 'undefined') {
    // Optionally, replace this with a custom DOM toast
    window.alert(`${type.toUpperCase()}: ${message}`);
  }
}
