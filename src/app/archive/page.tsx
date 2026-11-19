import AppShell from "@/components/shell/AppShell";
import ArchivePage from "@/components/archive/ArchivePage";

export default function Page() {
  return (
    <AppShell active="Observation archive">
      <ArchivePage />
    </AppShell>
  );
}
