export function formatCNPJ(value: string): string {
  const normalized = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();

  if (normalized.length < 14) {
    return value;
  }

  return normalized.slice(0, 14).replace(/^([A-Z0-9]{2})([A-Z0-9]{3})([A-Z0-9]{3})([A-Z0-9]{4})([A-Z0-9]{2})$/, "$1.$2.$3/$4-$5");
}
