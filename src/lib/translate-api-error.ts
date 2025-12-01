/**
 * Maps backend error messages (in Spanish) to translation keys.
 * This allows the frontend to display errors in the user's selected language.
 */
const backendErrorMap: Record<string, string> = {
  "Ya existe un usuario con el email proporcionado.": "authErrorEmailExists",
  "Credenciales inválidas.": "authErrorInvalidCredentials",
  "Datos incorrectos.": "authErrorInvalidCredentials",
  "El usuario no está activo.": "authErrorUserInactive",
  "Token inválido.": "authErrorInvalidToken",
  "El refresh token es inválido.": "authErrorRefreshTokenInvalid",
  "El refresh token ha sido revocado o expirado.": "authErrorRefreshTokenExpired",
  "El usuario está desactivado.": "authErrorUserDeactivated",
  "No se recibió authorization code ni access token.": "authErrorNoAuthCodeOrToken",
};

/**
 * Translates a backend error message using the provided translation function.
 * If no mapping exists, returns the original message.
 */
export function translateApiError(
  message: string,
  t: (key: string) => string
): string {
  const translationKey = backendErrorMap[message];
  if (translationKey) {
    return t(translationKey);
  }
  return message;
}
