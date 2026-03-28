// Shared helpers for all problem generators

export const rand  = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
export const pick  = (arr)      => arr[Math.floor(Math.random() * arr.length)]
export const shuffle = (arr)    => [...arr].sort(() => Math.random() - 0.5)
export const gcd   = (a, b)     => b === 0 ? a : gcd(b, a % b)
export const genId = ()         => `gen-${Date.now()}-${rand(1000, 9999)}`

// Ensure a number is always even (for clean triangle areas)
export const makeEven = (n) => n % 2 === 0 ? n : n + 1
