import {
  formatCPF,
  formatCNPJ,
  formatCpfCnpj,
  anonymizeCPF,
  anonymizeCNPJ,
  anonymizeCpfCnpj,
  validateCPF,
  validateCNPJ,
  validateCpfCnpj,
} from "./src";

const printExample = (label: string, input: string, formatter: (value: string) => string): void => {
  console.log(`${label} | entrada: ${input} | saída: ${formatter(input)}`);
};

console.log("=== Exemplos ===");
printExample("CPF", "12345678901", formatCPF);
printExample("CNPJ alfanumérico", "ab12cd34eg5691", formatCNPJ);
printExample("CPF/CNPJ (CPF)", "12345678901", formatCpfCnpj);
printExample("CPF/CNPJ (CNPJ)", "ab12cd34eg5691", formatCpfCnpj);
printExample("CPF inválido (retorna original)", "123", formatCPF);
printExample("CPF acima do permitido (trunca e formata)", "123456789012", formatCPF);
printExample("CNPJ inválido (retorna original)", "ABC123", formatCNPJ);
printExample("CNPJ acima do permitido (trunca e formata)", "AB12CD34EF560199", formatCNPJ);
printExample("CPF/CNPJ inválido (retorna original)", "1234567890", formatCpfCnpj);
printExample("CPF/CNPJ acima do permitido (trunca e formata com máscara CNPJ)", "123456789012345", formatCpfCnpj);

console.log("\n=== Exemplos de Anonimização ===");
printExample("anonymizeCPF", "12345678901", anonymizeCPF);
printExample("anonymizeCPF (já mascarado)", "123.456.789-01", anonymizeCPF);
printExample("anonymizeCNPJ (numérico)", "12345678000199", anonymizeCNPJ);
printExample("anonymizeCNPJ (alfanumérico)", "AB12CD34EG5691", anonymizeCNPJ);
printExample("anonymizeCpfCnpj (CPF)", "12345678901", anonymizeCpfCnpj);
printExample("anonymizeCpfCnpj (CNPJ)", "AB12CD34EG5691", anonymizeCpfCnpj);

console.log("\n=== Fluxo Completo: Formato → Anonimização ===");
const cpfInput = "12345678901";
const cpfFormatted = formatCPF(cpfInput);
const cpfAnonymous = anonymizeCPF(cpfFormatted);
console.log(`CPF: ${cpfInput} → ${cpfFormatted} → ${cpfAnonymous}`);

const cnpjInput = "AB12CD34EG5691";
const cnpjFormatted = formatCNPJ(cnpjInput);
const cnpjAnonymous = anonymizeCNPJ(cnpjFormatted);
console.log(`CNPJ: ${cnpjInput} → ${cnpjFormatted} → ${cnpjAnonymous}`);

console.log("\n=== Use Cases: Logs e Exibição Segura ===");
const documento = "12345678000199";
const formatado = formatCpfCnpj(documento);
const seguro = anonymizeCpfCnpj(formatado);
console.log(`[LOG] Documento cadastrado: ${seguro}`);
console.log(`[UI]  Exibindo para usuário: ${seguro}`);

const validateExample = (label: string, input: string, validator: (value: string) => boolean): void => {
  const result = validator(input) ? "válido ✓" : "inválido ✗";
  console.log(`${label}: ${input} → ${result}`);
};

console.log("\n=== Exemplos de Validação ===");
validateExample("CPF válido", "11144477735", validateCPF);
validateExample("CPF inválido", "12345678901", validateCPF);
validateExample("CPF já mascarado", "111.444.777-35", validateCPF);
validateExample("CNPJ numérico válido", "11222333000181", validateCNPJ);
validateExample("CNPJ numérico inválido", "12345678000199", validateCNPJ);
validateExample("CNPJ alfanumérico válido", "AB12CD34EG5691", validateCNPJ);
validateExample("CNPJ com letra proibida (I)", "AI12CD34EG5691", validateCNPJ);
validateExample("CNPJ com letra proibida (O)", "AO12CD34EG5691", validateCNPJ);
validateExample("CNPJ com letra proibida (U)", "AU12CD34EG5691", validateCNPJ);
validateExample("CNPJ com letra proibida (Q)", "AQ12CD34EG5691", validateCNPJ);
validateExample("CNPJ com letra proibida (F)", "AB12CD34EF5691", validateCNPJ);

console.log("\n=== Fluxo com Validação ===");
const userCPF = "11144477735";
if (validateCpfCnpj(userCPF)) {
  const formatted = formatCpfCnpj(userCPF);
  const anonymous = anonymizeCpfCnpj(formatted);
  console.log(`CPF válido! Formatado: ${formatted}, Anônimo: ${anonymous}`);
} else {
  console.log(`CPF inválido: ${userCPF}`);
}

const userCNPJ = "AB12CD34EG5691";
if (validateCpfCnpj(userCNPJ)) {
  const formatted = formatCpfCnpj(userCNPJ);
  const anonymous = anonymizeCpfCnpj(formatted);
  console.log(`CNPJ válido! Formatado: ${formatted}, Anônimo: ${anonymous}`);
} else {
  console.log(`CNPJ inválido: ${userCNPJ}`);
}
