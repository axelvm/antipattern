const GUILLAUME_POPUP_EVENT = "antipattern:guillaume-popup";

export const DEFAULT_GUILLAUME_MESSAGE =
  "petit coucou de Guillaume au passage !";

export const HELP_REQUEST_GUILLAUME_MESSAGE =
  "Guillaume traitera votre demande dans les meilleurs délais";

export function showGuillaumePopup(message: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(GUILLAUME_POPUP_EVENT, { detail: { message } }),
  );
}

export function subscribeGuillaumePopup(
  onShow: (message: string) => void,
) {
  if (typeof window === "undefined") return () => {};

  function onEvent(event: Event) {
    const custom = event as CustomEvent<{ message?: string }>;
    onShow(custom.detail?.message ?? DEFAULT_GUILLAUME_MESSAGE);
  }

  window.addEventListener(GUILLAUME_POPUP_EVENT, onEvent);
  return () => window.removeEventListener(GUILLAUME_POPUP_EVENT, onEvent);
}
