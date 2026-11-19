export type DoubleSlitParameters = {
  wavelengthNm: number;
  slitSeparationMm: number;
  slitWidthMm: number;
  screenDistanceM: number;
  mode: "single" | "double";
};

export type IntensityPoint = {
  x: number;
  intensity: number;
};

function sinc(x: number): number {
  if (Math.abs(x) < 1e-10) return 1;
  return Math.sin(x) / x;
}

export function calculateIntensity(
  xMeters: number,
  params: DoubleSlitParameters
): number {
  const lambda = params.wavelengthNm * 1e-9;
  const d = params.slitSeparationMm * 1e-3;
  const a = params.slitWidthMm * 1e-3;
  const L = params.screenDistanceM;

  const u = (Math.PI * a * xMeters) / (lambda * L);
  const diffraction = sinc(u) ** 2;

  if (params.mode === "single") return diffraction;

  const phase = (Math.PI * d * xMeters) / (lambda * L);
  const interference = Math.cos(phase) ** 2;

  return diffraction * interference;
}

export function generateIntensityData(
  params: DoubleSlitParameters,
  rangeMeters = 0.012,
  samples = 1200
): IntensityPoint[] {
  const points: IntensityPoint[] = [];

  for (let i = 0; i < samples; i++) {
    const x = -rangeMeters + (2 * rangeMeters * i) / (samples - 1);
    points.push({ x, intensity: calculateIntensity(x, params) });
  }

  return points;
}