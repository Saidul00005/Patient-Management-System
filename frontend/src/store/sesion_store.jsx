import { create } from 'zustand'

const useSesionToken = create((set) => ({
  token: 0,
  setToken: (newToken) => set((state) => ({ token: newToken })),
}))

export default useSesionToken