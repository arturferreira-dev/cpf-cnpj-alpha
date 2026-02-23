import { formatCPF } from "./cpf";
import { formatCNPJ } from "./cnpj";

export function formatCpfCnpj(value: string): string {
  const digits = value.replace(/\D/g, "");

  if (/^\d{11}$/.test(digits)) {
    return formatCPF(digits);
  }

  const alphaNumeric = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();

  if (alphaNumeric.length > 14) {
    return formatCNPJ(alphaNumeric.slice(0, 14));
  }

  if (/^[A-Z0-9]{14}$/.test(alphaNumeric)) {
    return formatCNPJ(alphaNumeric);
  }

  return value;
}
