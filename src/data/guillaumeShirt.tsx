export const GUILLAUME_VIEWBOX = { w: 90, h: 160 };

export const SHIRT_BUTTONS = [
  { x: 45, y: 64 },
  { x: 45, y: 70 },
  { x: 45, y: 76 },
  { x: 45, y: 82 },
  { x: 45, y: 88 },
  { x: 45, y: 94 },
  { x: 45, y: 100 },
  { x: 45, y: 106 },
] as const;

export const SHIRT_BUTTON_COUNT = SHIRT_BUTTONS.length;

export const BUTTON_RADIUS = 3.8;

export function buttonHotspotStyle(index: number) {
  const button = SHIRT_BUTTONS[index];
  const hit = BUTTON_RADIUS + 3.2;
  return {
    left: `${((button.x - hit) / GUILLAUME_VIEWBOX.w) * 100}%`,
    top: `${((button.y - hit) / GUILLAUME_VIEWBOX.h) * 100}%`,
    width: `${((hit * 2) / GUILLAUME_VIEWBOX.w) * 100}%`,
    height: `${((hit * 2) / GUILLAUME_VIEWBOX.h) * 100}%`,
  };
}

type SpriteProps = {
  openCount: number;
};

function remainingButtons(openCount: number) {
  return SHIRT_BUTTONS.filter((_, index) => index >= openCount);
}

export function GuillaumeSprite({ openCount }: SpriteProps) {
  const t = openCount / SHIRT_BUTTON_COUNT;
  const gapW = t * 12;
  const gapH = t * 48;
  const flap = t * 10;

  return (
    <svg
      viewBox={`0 0 ${GUILLAUME_VIEWBOX.w} ${GUILLAUME_VIEWBOX.h}`}
      className="h-full w-full"
      aria-hidden
    >
      <polygon points="28,150 42,102 58,102 70,150" fill="#5a5e62" />
      <polygon points="32,148 44,108 50,108 48,148" fill="#6a6e72" />

      <polygon
        points={`${22 - flap},58 ${68 + flap},50 ${74 + flap},108 ${18 - flap},104`}
        fill="#d4c2a0"
      />
      <polygon
        points={`${26 - flap},62 ${50 - gapW / 2},56 ${48 - gapW / 2},104 ${22 - flap},100`}
        fill="#cbb892"
      />
      {openCount > 0 ? (
        <polygon
          points={`${45 - gapW / 2},58 ${45 + gapW / 2},58 ${45 + gapW / 2},${58 + gapH} ${45 - gapW / 2},${58 + gapH}`}
          fill="#c4a07c"
        />
      ) : null}

      <polygon points="30,28 60,24 66,56 24,58" fill="#c4a07c" />
      <polygon points="32,18 58,16 62,34 28,36" fill="#3b2a1c" />
      <polygon points="38,22 52,20 54,30 36,32" fill="#c4a07c" />

      {remainingButtons(openCount).map((button) => (
        <circle
          key={`${button.x}-${button.y}`}
          cx={button.x}
          cy={button.y}
          r={BUTTON_RADIUS}
          fill="#000000"
        />
      ))}
    </svg>
  );
}
