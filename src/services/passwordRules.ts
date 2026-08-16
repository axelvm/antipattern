/**
 * Dedicated password verification for ANTIPATTERN registration.
 * Rules are evaluated in order; only the first failure is returned.
 */

export type PasswordRuleId =
  | "length-22"
  | "letter-and-number"
  | "special-char"
  | "special-char-not-paren"
  | "guillaume";

export type PasswordRule = {
  id: PasswordRuleId;
  message: string;
  test: (password: string) => boolean;
};

const SPECIAL_CHAR = /[^A-Za-z0-9]/;
const LETTER = /[A-Za-z]/;
const NUMBER = /[0-9]/;
/** Special character that is not a parenthesis. */
const SPECIAL_NOT_PAREN = /[^A-Za-z0-9()]/;

export const PASSWORD_RULES: readonly PasswordRule[] = [
  {
    id: "length-22",
    message: "Le mot de passe doit contenir exactement 22 caractères.",
    test: (password) => password.length === 22,
  },
  {
    id: "letter-and-number",
    message: "Le mot de passe doit contenir au moins une lettre et au moins un chiffre.",
    test: (password) => LETTER.test(password) && NUMBER.test(password),
  },
  {
    id: "special-char",
    message: "Le mot de passe doit contenir au moins un caractère spécial.",
    test: (password) => SPECIAL_CHAR.test(password),
  },
  {
    id: "special-char-not-paren",
    message:
      "Le mot de passe doit contenir un caractère spécial qui n’est pas une parenthèse.",
    test: (password) => SPECIAL_NOT_PAREN.test(password),
  },
  {
    id: "guillaume",
    message: "Le mot de passe doit contenir le nom de Guillaume.",
    test: (password) => password.includes("guillaume"),
  },
] as const;

export type PasswordCheckResult =
  | { ok: true }
  | { ok: false; ruleId: PasswordRuleId; message: string };

/**
 * Returns only the first failing rule — callers must not surface the rest.
 */
export function verifyPassword(password: string): PasswordCheckResult {
  for (const rule of PASSWORD_RULES) {
    if (!rule.test(password)) {
      return { ok: false, ruleId: rule.id, message: rule.message };
    }
  }
  return { ok: true };
}

/**
 * Human-proof: the same secret must be typed in all confirmation fields
 * before any suitability check runs.
 */
export function assertPasswordConfirmedThrice(
  first: string,
  second: string,
  third: string,
): { ok: true; password: string } | { ok: false; message: string } {
  if (!first || !second || !third) {
    return {
      ok: false,
      message:
        "Saisissez le mot de passe trois fois pour prouver que vous êtes humain.",
    };
  }

  if (first !== second || first !== third) {
    return {
      ok: false,
      message: "Les trois saisies du mot de passe doivent être identiques.",
    };
  }

  return { ok: true, password: first };
}
