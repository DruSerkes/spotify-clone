export const msToDuration = (timeMs: number) => `${Math.floor(timeMs / 60000)}:${Math.round((timeMs / 1000) % 60).toString().padStart(2, '0')}`