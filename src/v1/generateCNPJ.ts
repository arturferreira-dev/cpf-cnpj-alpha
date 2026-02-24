/**
 * Gera um CNPJ numérico válido aleatoriamente (14 dígitos)
 * 
 * @param formatted - Se true, retorna com máscara (XX.XXX.XXX/XXXX-XX), senão apenas dígitos
 * @returns CNPJ numérico válido gerado
 */
export function generateCNPJ(formatted: boolean = false): string {
  // Gera 12 dígitos aleatórios
  const firstTwelve = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10));

  // Calcula primeiro dígito verificador
  const multipliers1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += firstTwelve[i] * multipliers1[i];
  }
  let remainder = sum % 11;
  const dv1 = remainder < 2 ? 0 : 11 - remainder;

  // Calcula segundo dígito verificador
  const multipliers2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += firstTwelve[i] * multipliers2[i];
  }
  sum += dv1 * multipliers2[12];
  remainder = sum % 11;
  const dv2 = remainder < 2 ? 0 : 11 - remainder;

  // Monta o CNPJ
  const cnpj = firstTwelve.join("") + dv1 + dv2;

  return formatted ? cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5") : cnpj;
}

/**
 * Gera um CNPJ alfanumérico válido aleatoriamente
 * (12 caracteres alfanuméricos + 2 dígitos verificadores numéricos)
 * 
 * Não utiliza: I, O, U, Q, F (letras proibidas pela Receita Federal)
 * 
 * @param formatted - Se true, retorna com máscara (XX.XXX.XXX/XXXX-XX), senão apenas caracteres
 * @returns CNPJ alfanumérico válido gerado
 */
export function generateCNPJAlpha(formatted: boolean = false): string {
  // Caracteres permitidos: A-Z exceto I, O, U, Q, F, e dígitos 0-9
  const allowedChars = "ABCDEGHJKLMNPRSTEVWXYZ0123456789";

  // Gera 12 caracteres alfanuméricos aleatórios
  const firstTwelve = Array.from({ length: 12 }, () => {
    const randomIdx = Math.floor(Math.random() * allowedChars.length);
    return allowedChars[randomIdx];
  });

  // Converte caracteres pela regra da Receita: valor = charCode - 48
  // (A=65 -> 17, ..., Z=90 -> 42, 0=48 -> 0, ..., 9=57 -> 9)
  const charValues = firstTwelve.map((char) => {
    const code = char.charCodeAt(0);
    return code - 48;
  });

  // Calcula primeiro dígito verificador
  const multipliers1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += charValues[i] * multipliers1[i];
  }
  let remainder = sum % 11;
  const dv1 = remainder < 2 ? 0 : 11 - remainder;

  // Calcula segundo dígito verificador
  const multipliers2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += charValues[i] * multipliers2[i];
  }
  sum += dv1 * multipliers2[12];
  remainder = sum % 11;
  const dv2 = remainder < 2 ? 0 : 11 - remainder;

  // Monta o CNPJ alfanumérico
  const cnpj = firstTwelve.join("") + dv1 + dv2;

  return formatted ? cnpj.replace(/^([A-Z0-9]{2})([A-Z0-9]{3})([A-Z0-9]{3})([A-Z0-9]{4})([A-Z0-9]{2})$/, "$1.$2.$3/$4-$5") : cnpj;
}
