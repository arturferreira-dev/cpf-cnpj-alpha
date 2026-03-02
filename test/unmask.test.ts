import { describe, expect, test } from "bun:test";
import { unmaskCNPJ, unmaskCPF } from "../src/v1";

describe("unmaskCPF", () => {
  test("remove máscara de CPF já formatado", () => {
    expect(unmaskCPF("123.456.789-01")).toBe("12345678901");
  });

  test("mantém CPF já sem máscara", () => {
    expect(unmaskCPF("12345678901")).toBe("12345678901");
  });

  test("retorna o valor original para tamanho inválido", () => {
    expect(unmaskCPF("123")).toBe("123");
  });

  test("remove máscara e trunca CPF acima do permitido", () => {
    expect(unmaskCPF("123.456.789-012")).toBe("12345678901");
  });

  test("retorna string vazia para undefined ou null", () => {
    expect(unmaskCPF(undefined)).toBe("");
    expect(unmaskCPF(null)).toBe("");
  });
});

describe("unmaskCNPJ", () => {
  test("remove máscara de CNPJ numérico já formatado", () => {
    expect(unmaskCNPJ("12.345.678/0001-99")).toBe("12345678000199");
  });

  test("remove máscara de CNPJ alfanumérico já formatado e normaliza para maiúsculas", () => {
    expect(unmaskCNPJ("ab.12c.d34/ef56-01")).toBe("AB12CD34EF5601");
  });

  test("mantém CNPJ já sem máscara", () => {
    expect(unmaskCNPJ("AB12CD34EF5601")).toBe("AB12CD34EF5601");
  });

  test("retorna o valor original para tamanho inválido", () => {
    expect(unmaskCNPJ("ABC123")).toBe("ABC123");
  });

  test("remove máscara e trunca CNPJ acima do permitido", () => {
    expect(unmaskCNPJ("AB12CD34EF560199")).toBe("AB12CD34EF5601");
  });

  test("retorna string vazia para undefined ou null", () => {
    expect(unmaskCNPJ(undefined)).toBe("");
    expect(unmaskCNPJ(null)).toBe("");
  });
});
