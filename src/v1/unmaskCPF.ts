export function unmaskCPF(value?: string | null): string {
  if (value == null) {
    return "";
  }

  const digits = value.replace(/\D/g, "");

  if (digits.length < 11) {
    return value;
  }

  return digits.slice(0, 11);
}
