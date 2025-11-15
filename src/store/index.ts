import { create } from "zustand"

interface MacBookStore {
  color: string
  scale: number
  setColor: (color: string) => void
  setScale: (scale: number) => void
  reset: () => void
}

const useMacBookStore = create<MacBookStore>((set) => ({
  // Initial state - default to 14" model
  color: "#2e2c2e",
  scale: 0.06,  // Default to 14" (was 0.165 which doesn't match any size)
  
  // Actions
  setColor: (color) => set({ color }),
  setScale: (scale) => set({ scale }),
  reset: () => set({ color: '#2e2c2e', scale: 0.06 })
}))

export default useMacBookStore

// import { create } from "zustand"

// interface MacBookStore {
//   color: string
//   scale: number
//   setColor: (color: string) => void
//   setScale: (scale: number) => void
//   reset: () => void
// }

// const useMacBookStore = create<MacBookStore>((set) => ({
//   color: "#2e2c2e",
//   scale: 1.2, // Increased from 0.08
//   setColor: (color) => set({ color }),
//   setScale: (scale) => set({ scale }),
//   reset: () => set({ color: '#2e2c2e', scale: 1.2 })
// }))

// export default useMacBookStore