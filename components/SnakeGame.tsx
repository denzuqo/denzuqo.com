'use client';

import { Direction, directionVectors, Position } from '@/utils/direction';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const gridSize = 20;
const initialSnake: Position[] = [{ x: 10, y: 10 }];
const initialFood: Position = { x: 5, y: 5 };

// Cegah arah berlawanan
function isOppositeDirection(d1: Direction, d2: Direction): boolean {
  return (
    (d1 === 'UP' && d2 === 'DOWN') ||
    (d1 === 'DOWN' && d2 === 'UP') ||
    (d1 === 'LEFT' && d2 === 'RIGHT') ||
    (d1 === 'RIGHT' && d2 === 'LEFT')
  );
}

export default function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>(initialSnake);
  const [food, setFood] = useState<Position>(initialFood);
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const boardRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<Position | null>(null);

  const cellSizePx = 100 / gridSize;

  useEffect(() => {
    const interval = setInterval(() => {
      if (gameOver) return;

      setSnake((prev) => {
        const head = { ...prev[0] };
        const vector = directionVectors[direction];
        const newHead = { x: head.x + vector.x, y: head.y + vector.y };

        const hitWall =
          newHead.x < 0 || newHead.x >= gridSize ||
          newHead.y < 0 || newHead.y >= gridSize;

        const hitSelf = prev.some(
          (seg) => seg.x === newHead.x && seg.y === newHead.y
        );

        if (hitWall || hitSelf) {
          setGameOver(true);
          return prev;
        }

        const newSnake = [newHead, ...prev];

        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 1);
          setFood(randomFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });

    }, 150);

    return () => clearInterval(interval);
  }, [direction, food, gameOver]);

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const map: Record<string, Direction> = {
        ArrowUp: 'UP', w: 'UP',
        ArrowDown: 'DOWN', s: 'DOWN',
        ArrowLeft: 'LEFT', a: 'LEFT',
        ArrowRight: 'RIGHT', d: 'RIGHT',
      };
      const next = map[e.key];
      if (next && !isOppositeDirection(direction, next)) {
        setDirection(next);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [direction]);

  // Swipe controls
  useEffect(() => {
    const el = boardRef.current;
    if (!el) return;

    const onStart = (e: TouchEvent) => {
      const t = e.touches[0];
      touchStart.current = { x: t.clientX, y: t.clientY };
    };

    const onEnd = (e: TouchEvent) => {
      if (!touchStart.current) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - touchStart.current.x;
      const dy = t.clientY - touchStart.current.y;

      if (Math.abs(dx) > Math.abs(dy)) {
        const next = dx > 0 ? 'RIGHT' : 'LEFT';
        if (!isOppositeDirection(direction, next)) {
          setDirection(next);
        }
      } else {
        const next = dy > 0 ? 'DOWN' : 'UP';
        if (!isOppositeDirection(direction, next)) {
          setDirection(next);
        }
      }

      touchStart.current = null;
    };

    el.addEventListener('touchstart', onStart);
    el.addEventListener('touchend', onEnd);
    return () => {
      el.removeEventListener('touchstart', onStart);
      el.removeEventListener('touchend', onEnd);
    };
  }, [direction]);

  return (
    <div className="w-screen h-screen bg-[#94A8F0] flex items-center justify-center overflow-hidden">
      <div className="absolute flex items-center justify-center top-0 left-0 w-screen h-screen bg-transparent">
        <div className="w-full h-[50%] bg-[url('/img/ethos/game/snake/ethos.png')] bg-contain bg-no-repeat bg-center" />
      </div>
      {/* Score */}
      <div className="absolute top-4 left-4 text-xl font-bold text-white z-10">
        Score: {score}
      </div>

      {/* Game Over */}
      {gameOver && (
        <div className="absolute z-20 bg-black/80 text-white p-6 rounded-lg border border-white text-center">
          {score >= 10 ? (
            <>
              <h2 className="text-2xl mb-2 font-semibold text-green-300">🎉 You are eligible!</h2> 
              <br/> <div className="m-2"> Code : W3W0KD3T0K</div> <br/> 
            </>
          ) : (
            <h2 className="text-2xl mb-2 font-semibold text-red-300">😢 You are not eligible</h2>
          )}

          <p className="mb-4 text-sm text-gray-300">
            {score >= 10
              ? 'Congratulations! You reached the required score.'
              : 'Try again to reach a score of 10 or more.'}
          </p>

          <button
            className="mt-2 px-4 py-2 bg-white text-black rounded hover:bg-gray-300"
            onClick={() => {
              setSnake(initialSnake);
              setFood(initialFood);
              setScore(0);
              setDirection('RIGHT');
              setGameOver(false);
            }}
          >
            Restart
          </button>
        </div>
      )}


      {/* Game Board with margin */}
      <div
        ref={boardRef}
        className="relative m-5"
        style={{
          width: 'calc(100vmin - 2.5rem)',
          height: 'calc(100vmin - 2.5rem)',
          backgroundColor: '#a9b9f350',
        }}
      >
        {/* Food */}
        <div
          className="absolute rounded-full"
          style={{
            left: `${food.x * cellSizePx}%`,
            top: `${food.y * cellSizePx}%`,
            width: `${cellSizePx}%`,
            height: `${cellSizePx}%`,
            backgroundImage: 'url(/img/ethos/game/snake/food.png)',
            backgroundSize: 'cover',
          }}
        />

        {/* Snake */}
        {(snake ?? []).map((seg, idx) => (
          <div
            key={idx}
            className={`absolute flex border border-black items-center justify-center ${
              idx === 0 ? 'bg-white' : 'bg-[#7c8ecfff]'
            } rounded-full`}
            style={{
              left: `${seg.x * cellSizePx}%`,
              top: `${seg.y * cellSizePx}%`,
              width: `${cellSizePx}%`,
              height: `${cellSizePx}%`,
              zIndex: idx === 0 ? 9 : 1,
              overflow: 'hidden',
            }}
          >
            {idx === 0 && (
              <div className="relative flex items-center justify-center w-full h-full">
                <Image
                  src="/img/ethos/game/snake/snake-head.png"
                  alt="Snake Head"
                  width={30}
                  height={10}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function randomFood(snake: Position[]): Position {
  let newPos: Position;
  do {
    newPos = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
  } while (snake.some((seg) => seg.x === newPos.x && seg.y === newPos.y));
  return newPos;
}
