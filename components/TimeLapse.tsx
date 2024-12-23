'use client';

import { Card } from './Card';

export function TimeLapse() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] w-full">
      <Card variant="glass" className="p-4 md:p-8 w-full text-center">
        <h2 className="text-2xl md:text-3xl font-light text-gray-300 mb-4">Time Lapse</h2>
        <p className="text-sm md:text-base text-gray-400">
          Coming Soon! Watch the weather change over time.
        </p>
      </Card>
    </div>
  );
} 