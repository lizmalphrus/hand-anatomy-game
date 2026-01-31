import { Muscle } from "./types";

export const muscles: Muscle[] = [
  // Median nerve — main trunk (5)
  { id: "opponens-pollicis", name: "Opponens Pollicis", nerve: "median" },
  { id: "abductor-pollicis-brevis", name: "Abductor Pollicis Brevis", nerve: "median" },
  { id: "fpb-superficial", name: "FPB (superficial head)", nerve: "median" },
  { id: "lumbrical-1", name: "1st Lumbrical", nerve: "median" },
  { id: "lumbrical-2", name: "2nd Lumbrical", nerve: "median" },
  { id: "fds", name: "Flexor Digitorum Superficialis", nerve: "median" },

  // Median nerve — AIN branch (4)
  { id: "fpl", name: "Flexor Pollicis Longus", nerve: "median", subdivision: "AIN" },
  { id: "pronator-quadratus", name: "Pronator Quadratus", nerve: "median", subdivision: "AIN" },
  { id: "fdp-index", name: "FDP to Index", nerve: "median", subdivision: "AIN" },
  { id: "fdp-long", name: "FDP to Long", nerve: "median", subdivision: "AIN" },

  // Ulnar nerve (15)
  { id: "adductor-pollicis", name: "Adductor Pollicis", nerve: "ulnar" },
  { id: "fpb-deep", name: "FPB (deep head)", nerve: "ulnar" },
  { id: "lumbrical-3", name: "3rd Lumbrical", nerve: "ulnar" },
  { id: "lumbrical-4", name: "4th Lumbrical", nerve: "ulnar" },
  { id: "dorsal-interossei", name: "Dorsal Interossei", nerve: "ulnar" },
  { id: "palmar-interossei", name: "Palmar Interossei", nerve: "ulnar" },
  { id: "abductor-digiti-minimi", name: "Abductor Digiti Minimi", nerve: "ulnar" },
  { id: "flexor-digiti-minimi", name: "Flexor Digiti Minimi Brevis", nerve: "ulnar" },
  { id: "opponens-digiti-minimi", name: "Opponens Digiti Minimi", nerve: "ulnar" },
  { id: "palmaris-brevis", name: "Palmaris Brevis", nerve: "ulnar" },
  { id: "fcu", name: "Flexor Carpi Ulnaris", nerve: "ulnar" },
  { id: "fdp-ring", name: "FDP to Ring", nerve: "ulnar" },
  { id: "fdp-small", name: "FDP to Small", nerve: "ulnar" },

  // Radial nerve — main trunk (3)
  { id: "edc", name: "Extensor Digitorum Communis", nerve: "radial" },
  { id: "epb", name: "Extensor Pollicis Brevis", nerve: "radial" },
  { id: "apl", name: "Abductor Pollicis Longus", nerve: "radial" },

  // Radial nerve — PIN branch (3)
  { id: "epl", name: "Extensor Pollicis Longus", nerve: "radial", subdivision: "PIN" },
  { id: "eip", name: "Extensor Indicis Proprius", nerve: "radial", subdivision: "PIN" },
  { id: "edm", name: "Extensor Digiti Minimi", nerve: "radial", subdivision: "PIN" },
];

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
