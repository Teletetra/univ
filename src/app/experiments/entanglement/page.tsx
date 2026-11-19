import AppShell from "@/components/shell/AppShell";
import EntanglementExperiment from "@/components/experiments/EntanglementExperiment";

export default function Page() {
  return (
    <AppShell active="Experiments">
      <EntanglementExperiment />
    </AppShell>
  );
}