/**
 * Gera um CPF válido aleatoriamente
 * 
 * @param formatted - Se true, retorna com máscara (XXX.XXX.XXX-XX), senão apenas dígitos
 * @returns CPF válido gerado
 */
export function generateCPF(formatted: boolean = false): string {
  // Gera 9 dígitos aleatórios
  const firstNine = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));

  // Calcula primeiro dígito verificador
  let sum = 0;
  let multiplier = 10;
  for (let i = 0; i < 9; i++) {
    sum += firstNine[i] * multiplier;
    multiplier--;
  }
  let remainder = sum % 11;
  const dv1 = remainder < 2 ? 0 : 11 - remainder;

  // Calcula segundo dígito verificador
  sum = 0;
  multiplier = 11;
  for (let i = 0; i < 9; i++) {
    sum += firstNine[i] * multiplier;
    multiplier--;
  }
  sum += dv1 * 2;
  remainder = sum % 11;
  const dv2 = remainder < 2 ? 0 : 11 - remainder;

  // Monta o CPF
  const cpf = firstNine.join("") + dv1 + dv2;

  return formatted ? cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4") : cpf;
}
