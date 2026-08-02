export default function LoadingSkeleton() {
  return (
    <div className="glass-card overflow-hidden">
      {/* Color bar */}
      <div className="h-0.5 w-full skeleton rounded-none" />
      
      {/* Image */}
      <div className="h-48 skeleton" />

      {/* Body */}
      <div className="p-5 space-y-3">
        {/* Meta */}
        <div className="flex items-center gap-2">
          <div className="h-5 w-20 skeleton rounded-md" />
          <div className="h-4 w-14 skeleton rounded-md" />
          <div className="ml-auto h-4 w-16 skeleton rounded-md" />
        </div>

        {/* Title */}
        <div className="space-y-1.5">
          <div className="h-5 skeleton rounded-md" />
          <div className="h-5 w-4/5 skeleton rounded-md" />
        </div>

        {/* Summary */}
        <div className="space-y-1.5">
          <div className="h-4 skeleton rounded-md" />
          <div className="h-4 w-3/4 skeleton rounded-md" />
        </div>

        {/* CTA */}
        <div className="h-4 w-28 skeleton rounded-md pt-1" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <LoadingSkeleton key={i} />
      ))}
    </div>
  );
}

export function SkeletonRow({ count = 4 }: { count?: number }) {
  return (
    <div className="flex gap-5 overflow-hidden pb-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex-shrink-0 w-80">
          <LoadingSkeleton />
        </div>
      ))}
    </div>
  );
}
