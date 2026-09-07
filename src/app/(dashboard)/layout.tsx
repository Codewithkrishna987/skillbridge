import { Sidebar } from "@/components/layout/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 min-h-[calc(100vh-4rem)]">
      <Sidebar />
      <div className="flex-1 overflow-y-auto bg-[#f8faf9] p-3 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-6xl w-full">{children}</div>
      </div>
    </div>
  );
}
