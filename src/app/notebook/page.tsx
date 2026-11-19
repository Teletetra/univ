import AppShell from "@/components/shell/AppShell";
import Notebook from "@/components/archive/Notebook";

export default function Page() {
  return (
    <AppShell active="Research notebook">
      <Notebook />
    </AppShell>
  );
}
