import { validateCPF } from "./validateCPF";
import { validateCNPJ } from "./validateCNPJ";

/**
 * Valida um CPF ou CNPJ automaticamente detectando o tipo
 * 
 * @param value - CPF ou CNPJ com ou sem máscara
 * @returns true se é um CPF ou CNPJ válido, false caso contrário
 */
export function validateCpfCnpj(value: string): boolean {
  if (!value || typeof value !== "string") return false;

  const digits = value.replace(/\D/g, "");
  const cleanValue = value.replace(/[.\/\-\s]/g, "").toUpperCase();

  // 11 dígitos = CPF
  if (digits.length === 11) {
    return validateCPF(value);
  }

  // 14 caracteres alfanuméricos = CNPJ
  if (cleanValue.length === 14) {
    return validateCNPJ(value);
  }

  return false;
}
