import { anonymizeCPF } from "./anonymizeCPF";
import { anonymizeCNPJ } from "./anonymizeCNPJ";

const onlyDigits = (value: string): string => value.replace(/\D/g, "");
const onlyAlphaNumeric = (value: string): string => value.replace(/[^a-zA-Z0-9]/g, "");

export function anonymizeCpfCnpj(value: string): string {
  const digits = onlyDigits(value);

  if (digits.length === 11) {
    return anonymizeCPF(value);
  }

  const alphaNumeric = onlyAlphaNumeric(value);

  if (alphaNumeric.length >= 14) {
    return anonymizeCNPJ(value);
  }

  return value;
}
