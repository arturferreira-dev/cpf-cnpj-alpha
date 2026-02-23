/**
 * Valida um CPF usando o algoritmo de Módulo 11
 * Estrutura: 11 dígitos numéricos (9 raiz + 2 dígitos verificadores)
 * 
 * @param value - CPF com ou sem máscara (ex: "11144477735" ou "111.444.777-35")
 * @returns true se o CPF é válido, false caso contrário
 */
export function validateCPF(value: string): boolean {
  if (!value || typeof value !== "string") return false;

  // Remove caracteres não numéricos
  const digits = value.replace(/\D/g, "");

  // Deve ter exatamente 11 dígitos
  if (digits.length !== 11) return false;

  // Rejeita sequências repetidas (111.111.111-11, 222.222.222-22, etc)
  if (/^(\d)\1{10}$/.test(digits)) return false;

  // Calcula primeiro dígito verificador
  let sum = 0;
  let multiplier = 10;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(digits[i]) * multiplier;
    multiplier--;
  }
  let remainder = sum % 11;
  const firstDigit = remainder < 2 ? 0 : 11 - remainder;

  // Verifica primeiro dígito verificador
  if (parseInt(digits[9]) !== firstDigit) return false;

  // Calcula segundo dígito verificador
  sum = 0;
  multiplier = 11;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(digits[i]) * multiplier;
    multiplier--;
  }
  remainder = sum % 11;
  const secondDigit = remainder < 2 ? 0 : 11 - remainder;

  // Verifica segundo dígito verificador
  return parseInt(digits[10]) === secondDigit;
}
