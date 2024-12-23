'use client';

import { Card } from './Card';

export function TimeLapse() {
  return (
    <div className="flex flex-col items-center justify-center h-[485px]">
      <Card variant="glass" className="p-8 text-center">
        <h2 className="text-3xl font-light text-gray-300 mb-4">Time Lapse</h2>
        <p className="text-gray-400">
          Coming Soon! Watch the weather change over time.
        </p>
      </Card>
    </div>
  );
} 