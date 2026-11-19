export type Basis = "Z" | "X" | "Y";
export type QubitValue = 0 | 1;

export type JointProbability = {
  a: QubitValue;
  b: QubitValue;
  p: number;
};

export type Outcome = {
  a: QubitValue;
  b: QubitValue;
};

// Apply a single-qubit rotation matrix to one qubit of the state
// For X basis: H = (1/√2) [[1,1],[1,-1]]
// For Y basis: S†H = (1/√2) [[1,-i],[1,i]]
function rotationMatrix(basis: Basis): [number, [number, number][]] {
  // Returns [imagPrefactor, complex entries] where entries are [re, im]
  switch (basis) {
    case "Z":
      // identity, but in complex form
      return [
        1,
        [
          [1, 0],
          [0, 0],
          [0, 0],
          [1, 0],
        ],
      ];
    case "X": {
      const s = Math.SQRT1_2;
      return [
        1,
        [
          [s, 0],
          [s, 0],
          [s, 0],
          [-s, 0],
        ],
      ];
    }
    case "Y": {
      const s = Math.SQRT1_2;
      return [
        1,
        [
          [s, 0],
          [0, -s],
          [s, 0],
          [0, s],
        ],
      ];
    }
  }
}

/**
 * Computes the joint probability distribution for the Bell state
 * measured in the chosen bases.
 *
 * For Z basis: P(00) = P(11) = 0.5, P(01) = P(10) = 0.
 * For X basis: P(00) = P(11) = 0, P(01) = P(10) = 0.5 (anti-correlated).
 * For Y basis: P(00) = P(11) = 0, P(01) = P(10) = 0.5 (anti-correlated).
 *
 * The physics: |Φ+> gives +1 correlation in Z, but -1 in X and Y.
 * We show the joint probabilities honestly.
 */
export function jointProbabilities(basis: Basis): JointProbability[] {
  // Build the two-qubit rotation matrix as 4x4 complex, applied to Bell state.
  // For each qubit, apply the basis rotation, then square amplitudes.

  const rot = rotationMatrix(basis);
  const rotComplex = rot[1];

  // The rotation matrix for the first qubit in the 4-dim space.
  // We only need to know, for each output basis |a,b>, the projection
  // <a,b| (rot ⊗ rot) |Φ+> and then take |amplitude|^2.
  //
  // The Bell state |Φ+> = (1/√2) |00> + (1/√2) |11>.
  // So <a,b| (rot ⊗ rot) |Φ+> = (1/√2) [ rot[a][0]*rot[b][0] + rot[a][1]*rot[b][1] ].

  const out: JointProbability[] = [];

  const amp = (a: QubitValue, b: QubitValue): number => {
    // Complex amplitudes for |00> and |11> in the Bell state are both 1/√2.
    // <a,b| (rot ⊗ rot) |Φ+> = (1/√2) ( rot[a,0] * rot[b,0] + rot[a,1] * rot[b,1] )
    // where rot[i,j] is the complex entry, indices 0 or 1.
    const r = (i: number, j: number): [number, number] => {
      return rotComplex[i * 2 + j];
    };
    const c00 = r(a, 0);
    const c10 = r(b, 0);
    const c01 = r(a, 1);
    const c11 = r(b, 1);

    const term1Real = c00[0] * c10[0] - c00[1] * c10[1];
    const term1Imag = c00[0] * c10[1] + c00[1] * c10[0];

    const term2Real = c01[0] * c11[0] - c01[1] * c11[1];
    const term2Imag = c01[0] * c11[1] + c01[1] * c11[0];

    const real = (term1Real + term2Real) * Math.SQRT1_2;
    const imag = (term1Imag + term2Imag) * Math.SQRT1_2;

    return real * real + imag * imag;
  };

  for (const a of [0, 1] as const) {
    for (const b of [0, 1] as const) {
      out.push({ a, b, p: amp(a, b) });
    }
  }

  // Normalize for floating point safety
  const total = out.reduce((s, x) => s + x.p, 0);
  if (total > 0) {
    for (const o of out) o.p /= total;
  }

  return out;
}

export function sampleOutcome(basis: Basis): Outcome {
  const probs = jointProbabilities(basis);
  const r = Math.random();
  let acc = 0;
  for (const p of probs) {
    acc += p.p;
    if (r <= acc) return { a: p.a, b: p.b };
  }
  return { a: 0, b: 0 };
}

export function correlationLabel(basis: Basis): string {
  // For |Φ+>: Z correlated (+1), X and Y anti-correlated (-1)
  if (basis === "Z") return "Same outcomes";
  return "Opposite outcomes";
}