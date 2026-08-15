type AtmosphereProps = {
  children: React.ReactNode;
  dim?: boolean;
};

export function Atmosphere({ children, dim = false }: AtmosphereProps) {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: dim
            ? `
              radial-gradient(ellipse 80% 50% at 50% 0%, rgba(90, 107, 117, 0.35) 0%, transparent 55%),
              linear-gradient(165deg, #3a454c 0%, #2a3339 40%, #1a2228 100%)
            `
            : `
              radial-gradient(ellipse 90% 60% at 70% 15%, rgba(240, 201, 138, 0.45) 0%, transparent 55%),
              radial-gradient(ellipse 70% 50% at 20% 80%, rgba(90, 107, 117, 0.35) 0%, transparent 50%),
              linear-gradient(165deg, #c5d0d6 0%, #9aaab4 38%, #6d7f8a 72%, #4a5a64 100%)
            `,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      {!dim && (
        <div
          aria-hidden
          className="lamp-glow pointer-events-none absolute -top-24 right-[12%] h-[42vh] w-[42vh] rounded-full bg-[radial-gradient(circle,rgba(240,201,138,0.55)_0%,transparent_70%)] blur-2xl"
        />
      )}
      <div className="relative z-10 flex min-h-dvh flex-col">{children}</div>
    </div>
  );
}
