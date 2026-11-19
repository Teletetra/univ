import AppShell from "@/components/shell/AppShell";
import ProbabilityExperiment from "@/components/experiments/ProbabilityExperiment";

export default function Page() {
  return (
    <AppShell active="Experiments">
      <ProbabilityExperiment />
    </AppShell>
  );
}
