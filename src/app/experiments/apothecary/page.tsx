import AppShell from "@/components/shell/AppShell";
import ApothecaryPage from "@/components/apothecary/ApothecaryPage";

export default function Page() {
  return (
    <AppShell active="Experiments">
      <ApothecaryPage />
    </AppShell>
  );
}
