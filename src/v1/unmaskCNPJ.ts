export function unmaskCNPJ(value?: string | null): string {
  if (value == null) {
    return "";
  }

  const normalized = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();

  if (normalized.length < 14) {
    return value;
  }

  return normalized.slice(0, 14);
}
