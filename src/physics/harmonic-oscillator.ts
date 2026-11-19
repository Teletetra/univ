export type OscillatorLevel = {
  n: number;
  energy: number;
  label: string;
  observationId: string;
};

// Hermite polynomial H_n(x) computed recursively.
// H_0 = 1, H_1 = 2x, H_{n+1} = 2x H_n - 2n H_{n-1}
function hermite(n: number, x: number): number {
  if (n === 0) return 1;
  if (n === 1) return 2 * x;
  let h0 = 1;
  let h1 = 2 * x;
  let hn = 0;
  for (let k = 1; k < n; k++) {
    hn = 2 * x * h1 - 2 * k * h0;
    h0 = h1;
    h1 = hn;
  }
  return hn;
}

// ψ_n(ξ) = (1 / √(2^n n! √π)) H_n(ξ) e^{-ξ²/2}
// We compute up to a normalization constant that cancels in |ψ|².
function psi(n: number, xi: number): number {
  const h = hermite(n, xi);
  const gauss = Math.exp(-(xi * xi) / 2);
  return h * gauss;
}

export type WavefunctionPoint = {
  xi: number;       // dimensionless x
  psi: number;      // ψ_n(ξ)
  density: number;  // |ψ_n(ξ)|²
  classical: number; // classical probability density
};

// Classical turning point: ξ = √(2n + 1)
function classicalTurningPoint(n: number): number {
  return Math.sqrt(2 * n + 1);
}

// Classical probability density for a harmonic oscillator
// ρ_cl(ξ) = 1 / (π √(2n + 1 - ξ²)) for |ξ| < √(2n+1)
function classicalDensity(n: number, xi: number): number {
  const a = classicalTurningPoint(n);
  if (Math.abs(xi) >= a) return 0;
  return 1 / (Math.PI * Math.sqrt(a * a - xi * xi));
}

export function generateWavefunction(
  n: number,
  range = 12,
  samples = 400
): WavefunctionPoint[] {
  const points: WavefunctionPoint[] = [];

  // Compute raw values first, then normalize so max density = 1
  const raw: { xi: number; psi: number }[] = [];
  for (let i = 0; i < samples; i++) {
    const xi = -range + (2 * range * i) / (samples - 1);
    raw.push({ xi, psi: psi(n, xi) });
  }

  // Scale ψ so that the largest |ψ|² is 1 (visual normalization only)
  let maxDensity = 0;
  for (const r of raw) {
    const d = r.psi * r.psi;
    if (d > maxDensity) maxDensity = d;
  }
  const scale = maxDensity > 0 ? 1 / Math.sqrt(maxDensity) : 1;

  // Find max classical density for its own scaling (it blows up near turning points)
  let maxClassical = 0;
  for (const r of raw) {
    const c = classicalDensity(n, r.xi);
    if (c > maxClassical && c < 100) maxClassical = c;
  }
  const classicalScale = maxClassical > 0 ? 1 / maxClassical : 0;

  for (const r of raw) {
    const psiScaled = r.psi * scale;
    points.push({
      xi: r.xi,
      psi: psiScaled,
      density: psiScaled * psiScaled,
      classical: classicalDensity(n, r.xi) * classicalScale,
    });
  }

  return points;
}

export function energyOf(n: number): number {
  // E_n = ℏω(n + 1/2), displayed in units of ℏω
  return n + 0.5;
}

export const LEVELS: OscillatorLevel[] = [
  { n: 0, energy: 0.5, label: "Ground state", observationId: "curiosity" },
  { n: 1, energy: 1.5, label: "First excited", observationId: "intelligence" },
  { n: 2, energy: 2.5, label: "Second excited", observationId: "humor" },
  { n: 3, energy: 3.5, label: "Third excited", observationId: "worlds" },
  { n: 4, energy: 4.5, label: "Fourth excited", observationId: "warmth" },
];

export function classicalTurning(n: number): number {
  return classicalTurningPoint(n);
}