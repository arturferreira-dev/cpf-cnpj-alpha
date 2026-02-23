import {
  formatCPF,
  formatCNPJ,
  formatCpfCnpj,
  anonymizeCPF,
  anonymizeCNPJ,
  anonymizeCpfCnpj,
} from "./src";

const printExample = (label: string, input: string, formatter: (value: string) => string): void => {
  console.log(`${label} | entrada: ${input} | saída: ${formatter(input)}`);
};

console.log("=== Exemplos ===");
printExample("CPF", "12345678901", formatCPF);
printExample("CNPJ alfanumérico", "ab12cd34ef5601", formatCNPJ);
printExample("CPF/CNPJ (CPF)", "12345678901", formatCpfCnpj);
printExample("CPF/CNPJ (CNPJ)", "ab12cd34ef5601", formatCpfCnpj);
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
printExample("anonymizeCNPJ (alfanumérico)", "AB12CD34EF5601", anonymizeCNPJ);
printExample("anonymizeCpfCnpj (CPF)", "12345678901", anonymizeCpfCnpj);
printExample("anonymizeCpfCnpj (CNPJ)", "AB12CD34EF5601", anonymizeCpfCnpj);

console.log("\n=== Fluxo Completo: Formato → Anonimização ===");
const cpfInput = "12345678901";
const cpfFormatted = formatCPF(cpfInput);
const cpfAnonymous = anonymizeCPF(cpfFormatted);
console.log(`CPF: ${cpfInput} → ${cpfFormatted} → ${cpfAnonymous}`);

const cnpjInput = "AB12CD34EF5601";
const cnpjFormatted = formatCNPJ(cnpjInput);
const cnpjAnonymous = anonymizeCNPJ(cnpjFormatted);
console.log(`CNPJ: ${cnpjInput} → ${cnpjFormatted} → ${cnpjAnonymous}`);

console.log("\n=== Use Cases: Logs e Exibição Segura ===");
const documento = "12345678000199";
const formatado = formatCpfCnpj(documento);
const seguro = anonymizeCpfCnpj(formatado);
console.log(`[LOG] Documento cadastrado: ${seguro}`);
console.log(`[UI]  Exibindo para usuário: ${seguro}`);
