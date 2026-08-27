import type { ReactNode } from "react";

export type SceneAction =
  | "whiskey"
  | "wine"
  | "heater"
  | "magazine"
  | "phone"
  | "socks"
  | "speaker";

export type SceneItemData = {
  id: string;
  label: string;
  left: string;
  top: string;
  width: string;
  height: string;
  z: number;
  draw: ReactNode;
  action?: SceneAction;
};

function Poly({
  points,
  fill,
  opacity,
  stroke,
  strokeWidth,
}: {
  points: string;
  fill: string;
  opacity?: number;
  stroke?: string;
  strokeWidth?: number;
}) {
  return (
    <polygon
      points={points}
      fill={fill}
      opacity={opacity}
      stroke={stroke}
      strokeWidth={strokeWidth}
    />
  );
}

export function WhiskeyCocaGlass({ empty = false }: { empty?: boolean }) {
  return (
    <svg viewBox="0 0 48 48" className="h-full w-full">
      <Poly points="6,24 24,8 42,24 24,40" fill="#c5d0d6" opacity={0.35} />
      {empty ? null : (
        <>
          <Poly points="12,24 24,14 36,24 24,34" fill="#3a1c10" />
          <Poly points="16,22 24,16 30,22 24,28" fill="#5a2e14" />
          <Poly points="18,20 23,18 26,22 20,24" fill="#e8eef1" opacity={0.85} />
          <Poly points="24,22 29,20 31,25 26,26" fill="#d8e0e4" opacity={0.7} />
        </>
      )}
      <Poly
        points="8,24 24,10 40,24 24,38"
        fill="none"
        stroke="#d8e0e4"
        strokeWidth={2}
      />
    </svg>
  );
}

export function WineGlass({ empty = false }: { empty?: boolean }) {
  return (
    <svg viewBox="0 0 36 48" className="h-full w-full">
      <Poly points="8,40 28,40 24,10 12,10" fill="#c5d0d6" opacity={0.4} />
      {empty ? null : (
        <Poly points="12,36 24,36 22,14 14,14" fill="#6b1830" opacity={0.9} />
      )}
      <Poly points="16,40 20,40 19,46 17,46" fill="#c5d0d6" opacity={0.5} />
    </svg>
  );
}

function item(
  id: string,
  label: string,
  left: string,
  top: string,
  width: string,
  height: string,
  z: number,
  draw: ReactNode,
  action?: SceneAction,
): SceneItemData {
  return { id, label, left, top, width, height, z, draw, action };
}

export const SOIREE_ITEMS: SceneItemData[] = [
  item("window", "Fenêtre", "28%", "3%", "44%", "7%", 2, (
    <svg viewBox="0 0 220 36" className="h-full w-full">
      <Poly points="0,36 12,4 208,4 220,36" fill="#1b2833" />
      <Poly points="18,8 108,8 108,30 12,30" fill="#243848" />
      <Poly points="112,8 202,8 208,30 112,30" fill="#2a4254" />
      <Poly points="40,10 70,10 62,18 28,18" fill="#f0c98a" opacity={0.18} />
    </svg>
  )),
  item("door", "Porte", "86%", "36%", "11%", "22%", 2, (
    <svg viewBox="0 0 70 120" className="h-full w-full">
      <Poly points="8,8 62,2 66,118 4,112" fill="#5a4634" />
      <Poly points="14,16 56,12 58,108 12,104" fill="#6e5640" />
      <circle cx="50" cy="62" r="4" fill="#f0c98a" />
    </svg>
  )),
  item("heater", "Chauffage", "4%", "28%", "8%", "22%", 3, (
    <svg viewBox="0 0 50 120" className="h-full w-full">
      <Poly points="6,8 44,4 46,116 4,112" fill="#4a4a4a" />
      <Poly points="10,14 40,12 41,28 11,30" fill="#6a6a6a" />
      <Poly points="10,34 40,32 41,48 11,50" fill="#5a5a5a" />
      <Poly points="10,54 40,52 41,68 11,70" fill="#6a6a6a" />
      <Poly points="10,74 40,72 41,88 11,90" fill="#5a5a5a" />
      <Poly points="10,94 40,92 41,108 11,108" fill="#c45c26" opacity={0.55} />
    </svg>
  ), "heater"),
  item("plant", "Plante", "6%", "8%", "9%", "14%", 4, (
    <svg viewBox="0 0 80 90" className="h-full w-full">
      <Poly points="28,88 52,88 48,62 32,62" fill="#6b4e32" />
      <Poly points="40,64 18,28 40,40" fill="#2f6b3a" />
      <Poly points="40,64 62,22 48,42" fill="#3d8a4a" />
      <Poly points="40,60 32,16 46,36" fill="#24582c" />
    </svg>
  )),
  item("tv", "Télévision", "76%", "7%", "15%", "13%", 3, (
    <svg viewBox="0 0 120 80" className="h-full w-full">
      <Poly points="10,70 110,70 100,18 20,18" fill="#1a1a1a" />
      <Poly points="26,24 94,24 90,64 30,64" fill="#243038" />
      <Poly points="34,28 58,28 52,40 30,40" fill="#4a6a78" opacity={0.45} />
    </svg>
  )),
  item("lamp", "Lampe", "80%", "68%", "8%", "16%", 4, (
    <svg viewBox="0 0 70 110" className="h-full w-full">
      <Poly points="32,108 38,108 37,48 33,48" fill="#4a3a2a" />
      <Poly points="18,48 52,48 44,18 26,18" fill="#d8b56a" />
      <circle cx="35" cy="20" r="10" fill="#f7e3b0" opacity={0.55} />
    </svg>
  )),
  item("sofa", "Canapé", "8%", "36%", "26%", "26%", 4, (
    <svg viewBox="0 0 220 160" className="h-full w-full">
      <Poly points="8,40 212,28 208,150 12,148" fill="#3f3a34" />
      <Poly points="20,48 200,38 196,128 24,132" fill="#5c5348" />
      <Poly points="28,52 108,46 104,100 32,104" fill="#7a6e60" />
      <Poly points="116,44 192,40 188,96 112,98" fill="#6e6358" />
    </svg>
  )),
  item("cushion", "Coussin", "13%", "41%", "7%", "9%", 5, (
    <svg viewBox="0 0 70 60" className="h-full w-full">
      <Poly points="8,30 34,6 64,28 36,54" fill="#8c3a30" />
      <Poly points="18,30 34,14 52,28 36,44" fill="#a84a3c" />
    </svg>
  )),
  item("jacket", "Veste", "24%", "38%", "10%", "12%", 5, (
    <svg viewBox="0 0 80 70" className="h-full w-full">
      <Poly points="10,18 40,8 70,20 62,62 18,58" fill="#2a3339" />
      <Poly points="22,22 40,16 54,24 48,54 26,50" fill="#3d4f5c" />
    </svg>
  )),
  item("rug", "Tapis", "34%", "44%", "36%", "30%", 3, (
    <svg viewBox="0 0 260 160" className="h-full w-full">
      <Poly points="18,20 242,8 250,148 8,140" fill="#6b2a24" />
      <Poly points="36,32 224,22 230,132 28,124" fill="#8c3a30" />
    </svg>
  )),
  item("table", "Table", "38%", "50%", "20%", "18%", 6, (
    <svg viewBox="0 0 160 100" className="h-full w-full">
      <Poly points="8,78 18,14 150,8 154,86" fill="#6b4e32" />
      <Poly points="24,22 140,16 142,76 26,80" fill="#8a6644" />
      <Poly points="32,26 86,20 82,42 30,46" fill="#a07a52" />
    </svg>
  )),
  item("book", "Livre", "44%", "53%", "6%", "8%", 8, (
    <svg viewBox="0 0 60 40" className="h-full w-full">
      <Poly points="4,8 52,2 56,32 8,38" fill="#c45c26" />
      <Poly points="8,10 48,6 50,28 12,32" fill="#e8a06a" />
      <Poly points="6,8 10,8 14,36 8,36" fill="#5a2a12" />
    </svg>
  )),
  item("phone", "Téléphone", "50%", "56%", "4.5%", "6%", 9, (
    <svg viewBox="0 0 36 52" className="h-full w-full">
      <Poly points="6,4 30,2 32,48 8,50" fill="#111111" />
      <Poly points="10,10 26,8 27,40 11,42" fill="#3a454c" />
      <circle cx="18" cy="45" r="2" fill="#5a6b75" />
    </svg>
  ), "phone"),
  item("whiskey-1", "Verre de whiskey coca", "41%", "55%", "5%", "8%", 9, <WhiskeyCocaGlass />, "whiskey"),
  item("whiskey-2", "Verre de whiskey coca", "53%", "52%", "5%", "8%", 9, <WhiskeyCocaGlass />, "whiskey"),
  item("whiskey-3", "Verre de whiskey coca", "22%", "58%", "5%", "8%", 6, <WhiskeyCocaGlass />, "whiskey"),
  item("whiskey-4", "Verre de whiskey coca", "68%", "64%", "5%", "8%", 6, <WhiskeyCocaGlass />, "whiskey"),
  item("whiskey-5", "Verre de whiskey coca", "47%", "70%", "5%", "8%", 6, <WhiskeyCocaGlass />, "whiskey"),
  item("wine-1", "Verre de vin", "46%", "58%", "4%", "8%", 9, <WineGlass />, "wine"),
  item("wine-2", "Verre de vin", "26%", "50%", "4%", "8%", 6, <WineGlass />, "wine"),
  item("remote", "Télécommande", "54%", "60%", "5%", "4%", 8, (
    <svg viewBox="0 0 50 22" className="h-full w-full">
      <Poly points="2,8 46,2 48,16 4,20" fill="#1a1a1a" />
      <Poly points="10,8 18,6 18,12 10,14" fill="#c45c26" />
    </svg>
  )),
  item("sandals", "Sandales de Guillaume", "17%", "66%", "9%", "7%", 5, (
    <svg viewBox="0 0 90 50" className="h-full w-full">
      <Poly points="6,18 38,8 42,28 8,34" fill="#6b4e32" />
      <Poly points="48,14 84,10 86,30 50,32" fill="#5a3e28" />
      <Poly points="12,16 34,12 32,18 14,20" fill="#d4c2a0" />
    </svg>
  )),
  item("keys", "Clés", "36%", "62%", "5%", "5%", 7, (
    <svg viewBox="0 0 50 40" className="h-full w-full">
      <circle cx="14" cy="16" r="8" fill="#c4b08c" />
      <Poly points="20,16 46,12 48,18 22,22" fill="#d8c6a4" />
      <Poly points="34,12 38,8 40,20 36,22" fill="#a09070" />
    </svg>
  )),
  item("pizza", "Boîte à pizza", "30%", "72%", "12%", "10%", 5, (
    <svg viewBox="0 0 90 70" className="h-full w-full">
      <Poly points="8,20 80,8 84,52 12,62" fill="#d8c6a4" />
      <Poly points="16,24 72,16 74,46 18,52" fill="#c45c26" />
      <Poly points="28,30 50,24 48,40 26,42" fill="#f0c98a" />
    </svg>
  )),
  item("chips", "Bol de chips", "64%", "74%", "6%", "8%", 6, (
    <svg viewBox="0 0 50 50" className="h-full w-full">
      <Poly points="8,28 42,22 40,42 10,44" fill="#6b4e32" />
      <Poly points="14,20 26,12 38,18 34,28 16,30" fill="#e8a06a" />
      <Poly points="20,16 30,14 28,22 18,22" fill="#c45c26" />
    </svg>
  )),
  item("can", "Canette", "72%", "72%", "3.5%", "7%", 6, (
    <svg viewBox="0 0 28 50" className="h-full w-full">
      <Poly points="6,46 22,44 20,8 8,10" fill="#c45c26" />
      <Poly points="8,16 20,14 19,24 9,26" fill="#f0c98a" />
    </svg>
  )),
  item("speaker", "Enceinte", "74%", "22%", "7%", "10%", 4, (
    <svg viewBox="0 0 60 70" className="h-full w-full">
      <Poly points="8,10 52,6 54,64 6,60" fill="#1a1a1a" />
      <circle cx="30" cy="24" r="8" fill="#3a3a3a" />
      <circle cx="30" cy="46" r="10" fill="#2a2a2a" />
    </svg>
  ), "speaker"),
  item("bag", "Sac", "8%", "64%", "9%", "11%", 5, (
    <svg viewBox="0 0 70 70" className="h-full w-full">
      <Poly points="12,24 58,18 62,62 8,60" fill="#3d2c1e" />
      <Poly points="24,12 36,8 38,26 22,28" fill="#5a3e28" />
    </svg>
  )),
  item("trash", "Poubelle", "90%", "62%", "6%", "12%", 3, (
    <svg viewBox="0 0 50 80" className="h-full w-full">
      <Poly points="10,16 40,12 42,74 8,70" fill="#3a3a3a" />
      <Poly points="6,12 44,8 42,18 8,20" fill="#2a2a2a" />
    </svg>
  )),
  item("laptop", "Ordinateur", "12%", "74%", "10%", "8%", 6, (
    <svg viewBox="0 0 80 50" className="h-full w-full">
      <Poly points="8,12 72,6 70,36 10,40" fill="#1a1a1a" />
      <Poly points="14,16 64,12 62,30 16,32" fill="#4a5a64" />
    </svg>
  )),
  item("headphones", "Casque", "20%", "78%", "6%", "6%", 7, (
    <svg viewBox="0 0 50 40" className="h-full w-full">
      <Poly points="8,28 14,8 36,8 42,28" fill="none" stroke="#1a1a1a" strokeWidth={4} />
      <Poly points="4,20 16,18 16,34 4,32" fill="#2a2a2a" />
      <Poly points="34,18 46,20 46,32 34,34" fill="#2a2a2a" />
    </svg>
  )),
  item("candle", "Bougie", "62%", "54%", "4%", "7%", 8, (
    <svg viewBox="0 0 30 50" className="h-full w-full">
      <Poly points="8,46 22,44 20,16 10,18" fill="#d8e0e4" />
      <Poly points="13,16 17,14 16,8 14,8" fill="#f0c98a" />
    </svg>
  )),
  item("ashtray", "Cendrier", "36%", "56%", "5%", "5%", 8, (
    <svg viewBox="0 0 40 30" className="h-full w-full">
      <Poly points="4,16 36,10 34,24 6,26" fill="#5a5a5a" />
      <Poly points="12,14 20,8 22,16" fill="#2a2a2a" />
    </svg>
  )),
  item("magazine", "Revue", "28%", "54%", "7%", "7%", 7, (
    <svg viewBox="0 0 60 45" className="h-full w-full">
      <Poly points="4,10 54,4 56,36 6,40" fill="#d8e0e4" />
      <Poly points="10,14 30,10 28,22 8,24" fill="#c45c26" />
    </svg>
  ), "magazine"),
  item("socks", "Chaussettes", "33%", "80%", "8%", "7%", 6, (
    <svg viewBox="0 0 70 40" className="h-full w-full">
      <Poly points="4,28 14,6 26,8 20,32" fill="#3d4f5c" />
      <Poly points="20,24 40,20 42,30 18,32" fill="#2a3339" />
      <Poly points="30,26 40,8 52,10 46,32" fill="#4a5e6c" />
      <Poly points="46,24 66,20 68,30 44,32" fill="#334048" />
    </svg>
  ), "socks"),
  item("charger", "Chargeur", "70%", "78%", "6%", "5%", 6, (
    <svg viewBox="0 0 50 30" className="h-full w-full">
      <Poly points="4,10 18,8 20,22 6,24" fill="#1a1a1a" />
      <Poly points="18,14 46,12 46,16 18,18" fill="#c4b08c" />
    </svg>
  )),
  item("clock", "Horloge", "68%", "8%", "6%", "9%", 3, (
    <svg viewBox="0 0 50 50" className="h-full w-full">
      <Poly points="8,25 25,6 42,25 25,44" fill="#d8c6a4" />
      <Poly points="16,25 25,14 34,25 25,36" fill="#e8eef1" />
      <Poly points="25,25 25,16 27,16 26,25" fill="#1a1a1a" />
    </svg>
  )),
  item("frame", "Cadre", "18%", "6%", "7%", "10%", 3, (
    <svg viewBox="0 0 50 60" className="h-full w-full">
      <Poly points="6,8 44,4 46,52 8,54" fill="#6b4e32" />
      <Poly points="12,14 38,10 40,44 14,46" fill="#4a5a64" />
    </svg>
  )),
  item("controller", "Manette", "16%", "58%", "7%", "6%", 6, (
    <svg viewBox="0 0 60 36" className="h-full w-full">
      <Poly points="4,16 20,8 40,8 56,16 50,28 10,28" fill="#1a1a1a" />
      <circle cx="18" cy="18" r="4" fill="#3a3a3a" />
      <circle cx="42" cy="16" r="3" fill="#c45c26" />
    </svg>
  )),
  item("shoe", "Chaussure", "82%", "82%", "7%", "6%", 5, (
    <svg viewBox="0 0 60 36" className="h-full w-full">
      <Poly points="4,20 28,8 54,14 50,28 8,30" fill="#1a1a1a" />
      <Poly points="8,18 24,12 26,20 10,22" fill="#3a3a3a" />
    </svg>
  )),
  item("coat-hook", "Patère", "88%", "18%", "6%", "10%", 3, (
    <svg viewBox="0 0 40 60" className="h-full w-full">
      <Poly points="16,4 24,4 24,56 16,56" fill="#6b4e32" />
      <Poly points="8,16 32,12 30,20 10,22" fill="#8a6644" />
    </svg>
  )),
];
