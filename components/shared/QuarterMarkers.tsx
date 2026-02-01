'use client';

export function QuarterMarkers() {
  return (
    <div className="flex w-full mt-1">
      {['Q1', 'Q2', 'Q3', 'Q4'].map((quarter) => (
        <div key={quarter} className="flex-1 text-center quarter-marker">
          <span className="quarter-label">{quarter}</span>
        </div>
      ))}
    </div>
  );
}
