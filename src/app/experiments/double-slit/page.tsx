import AppShell from "@/components/shell/AppShell";
import DoubleSlitExperiment from "@/components/experiments/DoubleSlitExperiment"
export default function Page() {
  return (
    <AppShell active="Experiments">
      <h1 className="font-serif text-3xl">The Double-Slit Experiment</h1>
        <DoubleSlitExperiment/>
    </AppShell>
  );
}