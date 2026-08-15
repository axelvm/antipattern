/** Code de validation e-mail dissimulé dans les CGU (article 14). */
export const EMAIL_VALIDATION_CODE = "CLAUSE-14-BIS";

export function isEmailValidationCode(value: string): boolean {
  return value.trim().toUpperCase() === EMAIL_VALIDATION_CODE;
}
