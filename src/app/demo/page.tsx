import IntegrationCardDemo from "@/components/ui/integration-card";

export const metadata = {
  title: "Integration Card Demo | Lengine",
  description: "Interactive showcase of our platform integrations and data streaming ecosystem.",
};

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-slate-50/80 flex items-center justify-center p-4 sm:p-8">
      <IntegrationCardDemo />
    </div>
  );
}
