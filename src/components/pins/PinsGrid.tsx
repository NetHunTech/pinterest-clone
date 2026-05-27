export default function PinGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="p-6 columns-2 md:columns-3 lg:columns-5 gap-4 space-y-4">
      {children}
    </main>
  );
}