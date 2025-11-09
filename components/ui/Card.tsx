export default function Card({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white rounded-lg border border-border p-6 shadow-sm ${className}`}>
      {children}
    </div>
  );
}
