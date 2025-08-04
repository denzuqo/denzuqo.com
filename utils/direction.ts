export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export const directionVectors: Record<Direction, { x: number; y: number }> = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

export interface Position {
  x: number;
  y: number;
}
