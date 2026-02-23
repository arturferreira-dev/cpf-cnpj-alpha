const onlyAlphaNumeric = (value: string): string => value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();

export function anonymizeCNPJ(value: string): string {
  const normalized = onlyAlphaNumeric(value);

  if (normalized.length < 14) {
    return value;
  }

  const cnpj = normalized.slice(0, 14);

  return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.***/****-${cnpj.slice(12, 14)}`;
}
