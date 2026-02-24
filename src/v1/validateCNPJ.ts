/**
 * Valida um CNPJ numérico ou alfanumérico usando o algoritmo de Módulo 11
 * 
 * Estrutura CNPJ Alfanumérico:
 * - 12 caracteres alfanuméricos (raiz + ordem)
 * - 2 dígitos verificadores numéricos
 * - Letras proibidas: I, O, U, Q, F (evitar confusão)
 * - Conversão ASCII da Receita: valor = charCode - 48 (A=17, B=18, ... Z=42)
 * 
 * Estrutura CNPJ Numérico (compatibilidade):
 * - 14 dígitos numéricos
 * 
 * @param value - CNPJ com ou sem máscara (ex: "11222333000181" ou "11.222.333/0001-81")
 * @returns true se o CNPJ é válido, false caso contrário
 */
export function validateCNPJ(value: string): boolean {
  if (!value || typeof value !== "string") return false;

  // Remove caracteres de máscara
  const cleanValue = value.replace(/[.\/\-\s]/g, "").toUpperCase();

  // Deve ter exatamente 14 caracteres
  if (cleanValue.length !== 14) return false;

  // Primeiros 12 caracteres devem ser alfanuméricos, últimos 2 devem ser dígitos
  if (!/^[A-Z0-9]{12}[0-9]{2}$/.test(cleanValue)) return false;

  // Verifica se há letras proibidas (I, O, U, Q, F)
  if (/[IOUQF]/.test(cleanValue)) return false;

  // Se for totalmente numérico, valida com módulo 11 padrão
  if (/^\d{14}$/.test(cleanValue)) {
    return validateNumericCNPJ(cleanValue);
  }

  // Se tiver letras, valida com conversão ASCII
  return validateAlphanumericCNPJ(cleanValue);
}

/**
 * Valida CNPJ totalmente numérico (14 dígitos)
 */
function validateNumericCNPJ(digits: string): boolean {
  // Rejeita sequências repetidas
  if (/^(\d)\1{13}$/.test(digits)) return false;

  // Calcula primeiro dígito verificador
  let sum = 0;
  const multipliers1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < 12; i++) {
    sum += parseInt(digits[i]) * multipliers1[i];
  }
  let remainder = sum % 11;
  const firstDigit = remainder < 2 ? 0 : 11 - remainder;

  // Verifica primeiro dígito verificador
  if (parseInt(digits[12]) !== firstDigit) return false;

  // Calcula segundo dígito verificador
  sum = 0;
  const multipliers2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < 13; i++) {
    sum += parseInt(digits[i]) * multipliers2[i];
  }
  remainder = sum % 11;
  const secondDigit = remainder < 2 ? 0 : 11 - remainder;

  // Verifica segundo dígito verificador
  return parseInt(digits[13]) === secondDigit;
}

/**
 * Valida CNPJ alfanumérico (com letras A-Z)
 * Converte cada caractere usando a regra da Receita: valor = charCode - 48
 * (A=65 -> 17, B=66 -> 18, ..., Z=90 -> 42, 0=48 -> 0, ..., 9=57 -> 9)
 */
function validateAlphanumericCNPJ(value: string): boolean {
  const chars = value.substring(0, 12);
  const dvString = value.substring(12, 14);

  // Converte caracteres para valores numéricos
  const charValues = chars.split("").map((char) => {
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
  const firstDigit = remainder < 2 ? 0 : 11 - remainder;

  // Verifica primeiro dígito verificador
  if (parseInt(dvString[0]) !== firstDigit) return false;

  // Calcula segundo dígito verificador
  const dvFirstValue = parseInt(dvString[0]);
  const multipliers2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += charValues[i] * multipliers2[i];
  }
  sum += dvFirstValue * multipliers2[12];
  remainder = sum % 11;
  const secondDigit = remainder < 2 ? 0 : 11 - remainder;

  // Verifica segundo dígito verificador
  return parseInt(dvString[1]) === secondDigit;
}
