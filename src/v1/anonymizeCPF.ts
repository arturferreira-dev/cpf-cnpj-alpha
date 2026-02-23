const onlyDigits = (value: string): string => value.replace(/\D/g, "");

export function anonymizeCPF(value: string): string {
  const digits = onlyDigits(value);

  if (digits.length < 11) {
    return value;
  }

  const cpf = digits.slice(0, 11);

  return `${cpf.slice(0, 3)}.***.***-${cpf.slice(9, 11)}`;
}
