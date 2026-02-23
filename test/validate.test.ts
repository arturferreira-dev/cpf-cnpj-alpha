import { describe, it, expect } from "bun:test";
import { validateCPF, validateCNPJ, validateCpfCnpj } from "../src/v1";

describe("v1 validateCPF", () => {
  it("valida CPF numérico válido", () => {
    expect(validateCPF("11144477735")).toBe(true);
  });

  it("valida CPF já mascarado", () => {
    expect(validateCPF("111.444.777-35")).toBe(true);
  });

  it("rejeita CPF inválido", () => {
    expect(validateCPF("12345678901")).toBe(false);
  });

  it("rejeita CPF com sequências repetidas", () => {
    expect(validateCPF("11111111111")).toBe(false);
  });

  it("rejeita CPF com tamanho inválido", () => {
    expect(validateCPF("1234567890")).toBe(false);
  });
});

describe("v1 validateCNPJ", () => {
  it("valida CNPJ numérico válido", () => {
    expect(validateCNPJ("11222333000181")).toBe(true);
  });

  it("valida CNPJ já mascarado", () => {
    expect(validateCNPJ("11.222.333/0001-81")).toBe(true);
  });

  it("valida CNPJ alfanumérico válido", () => {
    expect(validateCNPJ("AB12CD34EG5691")).toBe(true);
  });

  it("rejeita CNPJ alfanumérico com letra proibida I", () => {
    expect(validateCNPJ("AI12CD34EF5601")).toBe(false);
  });

  it("rejeita CNPJ alfanumérico com letra proibida O", () => {
    expect(validateCNPJ("AO12CD34EF5601")).toBe(false);
  });

  it("rejeita CNPJ alfanumérico com letra proibida U", () => {
    expect(validateCNPJ("AU12CD34EF5601")).toBe(false);
  });

  it("rejeita CNPJ alfanumérico com letra proibida Q", () => {
    expect(validateCNPJ("AQ12CD34EF5601")).toBe(false);
  });

  it("rejeita CNPJ alfanumérico com letra proibida F", () => {
    expect(validateCNPJ("AF12CD34EF5601")).toBe(false);
  });

  it("rejeita CNPJ alfanumérico inválido (checksum)", () => {
    expect(validateCNPJ("AB12CD34EF5602")).toBe(false);
  });

  it("rejeita CNPJ com sequências repetidas", () => {
    expect(validateCNPJ("11111111111111")).toBe(false);
  });

  it("rejeita CNPJ com tamanho inválido", () => {
    expect(validateCNPJ("123456")).toBe(false);
  });
});

describe("v1 validateCpfCnpj", () => {
  it("detecta e valida CPF válido", () => {
    expect(validateCpfCnpj("11144477735")).toBe(true);
  });

  it("detecta e valida CNPJ numérico válido", () => {
    expect(validateCpfCnpj("11222333000181")).toBe(true);
  });

  it("detecta e valida CNPJ alfanumérico válido", () => {
    expect(validateCpfCnpj("AB12CD34EG5691")).toBe(true);
  });

  it("rejeita CPF inválido", () => {
    expect(validateCpfCnpj("12345678901")).toBe(false);
  });

  it("rejeita CNPJ inválido", () => {
    expect(validateCpfCnpj("12345678000199")).toBe(false);
  });

  it("rejeita valor com tamanho inválido", () => {
    expect(validateCpfCnpj("1234567890")).toBe(false);
  });

  it("rejeita valor vazio", () => {
    expect(validateCpfCnpj("")).toBe(false);
  });
});
