export function formatCPF(value?: string | null): string {
  if (value == null) {
    return "";
  }

  const digits = value.replace(/\D/g, "");

  if (digits.length < 11) {
    return value;
  }

  return digits.slice(0, 11).replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
}
