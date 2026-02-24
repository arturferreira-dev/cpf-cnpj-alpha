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

  const cleanValue = value.replace(/[.\/\-\s]/g, "").toUpperCase();
  const digits = value.replace(/\D/g, "");

  // 14 caracteres alfanuméricos = CNPJ (prioridade para evitar conflito com CNPJ alfa)
  if (cleanValue.length === 14) {
    return validateCNPJ(value);
  }

  // 11 dígitos puros = CPF
  if (digits.length === 11 && cleanValue.length === 11) {
    return validateCPF(value);
  }

  return false;
}
