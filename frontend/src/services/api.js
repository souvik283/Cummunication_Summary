// Lightweight mock of a realtime socket connection. In production this
// would wrap something like socket.io-client and connect to your server.
// The interface (connect / on / off / emit / disconnect) is kept the same
// so it's a drop-in swap later.

class MockSocket {
  constructor() {
    this.listeners = new Map()
    this.connected = false
  }

  connect() {
    this.connected = true
    return this
  }

  disconnect() {
    this.connected = false
    this.listeners.clear()
  }

  on(event, handler) {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set())
    this.listeners.get(event).add(handler)
    return () => this.off(event, handler)
  }

  off(event, handler) {
    this.listeners.get(event)?.delete(handler)
  }

  emit(event, payload) {
    this.listeners.get(event)?.forEach((handler) => handler(payload))
  }
}

export const socket = new MockSocket()
