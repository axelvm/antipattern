/**
 * Code de validation e-mail (provisoire).
 * La procédure définitive dans les CGU sera détaillée plus tard.
 */
export const EMAIL_VALIDATION_CODE = "CLAUSE-14-BIS";

export function isEmailValidationCode(value: string): boolean {
  return value.trim().toUpperCase() === EMAIL_VALIDATION_CODE;
}
