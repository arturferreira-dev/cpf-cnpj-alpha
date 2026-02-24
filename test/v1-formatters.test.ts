import { describe, expect, test } from "bun:test";
import { formatCNPJ, formatCPF, formatCpfCnpj } from "../src/v1";

describe("v1 formatCPF", () => {
  test("formata CPF numérico", () => {
    expect(formatCPF("12345678901")).toBe("123.456.789-01");
  });

  test("aceita CPF já mascarado", () => {
    expect(formatCPF("123.456.789-01")).toBe("123.456.789-01");
  });

  test("retorna o valor original para tamanho inválido", () => {
    expect(formatCPF("123")).toBe("123");
  });

  test("trunca e formata CPF acima do permitido", () => {
    expect(formatCPF("123456789012")).toBe("123.456.789-01");
  });

  test("retorna string vazia para undefined ou null", () => {
    expect(formatCPF(undefined)).toBe("");
    expect(formatCPF(null)).toBe("");
  });
});

describe("v1 formatCNPJ", () => {
  test("formata CNPJ numérico", () => {
    expect(formatCNPJ("12345678000199")).toBe("12.345.678/0001-99");
  });

  test("formata CNPJ alfanumérico e normaliza para maiúsculas", () => {
    expect(formatCNPJ("ab12cd34ef5601")).toBe("AB.12C.D34/EF56-01");
  });

  test("aceita CNPJ com separadores misturados", () => {
    expect(formatCNPJ("AB.12C.D34/EF56-01")).toBe("AB.12C.D34/EF56-01");
  });

  test("retorna o valor original para tamanho inválido", () => {
    expect(formatCNPJ("ABC123")).toBe("ABC123");
  });

  test("trunca e formata CNPJ acima do permitido", () => {
    expect(formatCNPJ("AB12CD34EF560199")).toBe("AB.12C.D34/EF56-01");
  });

  test("retorna string vazia para undefined ou null", () => {
    expect(formatCNPJ(undefined)).toBe("");
    expect(formatCNPJ(null)).toBe("");
  });
});

describe("v1 formatCpfCnpj", () => {
  test("detecta e formata CPF", () => {
    expect(formatCpfCnpj("12345678901")).toBe("123.456.789-01");
  });

  test("detecta e formata CNPJ numérico", () => {
    expect(formatCpfCnpj("12345678000199")).toBe("12.345.678/0001-99");
  });

  test("detecta e formata CNPJ alfanumérico", () => {
    expect(formatCpfCnpj("ab12cd34ef5601")).toBe("AB.12C.D34/EF56-01");
  });

  test("retorna o valor original para valor que não seja CPF/CNPJ", () => {
    expect(formatCpfCnpj("1234567890")).toBe("1234567890");
  });

  test("trunca e formata valor acima do permitido com máscara CNPJ", () => {
    expect(formatCpfCnpj("123456789012345")).toBe("12.345.678/9012-34");
  });

  test("retorna string vazia para undefined ou null", () => {
    expect(formatCpfCnpj(undefined)).toBe("");
    expect(formatCpfCnpj(null)).toBe("");
  });
});
