import {
  formatCPF,
  formatCNPJ,
  formatCpfCnpj,
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
