import { describe, it, expect } from "bun:test";
import { generateCPF, generateCNPJ, generateCNPJAlpha, validateCPF, validateCNPJ, formatCNPJ } from "../src/v1";

describe("v1 generateCPF", () => {
  it("gera CPF válido sem formatação", () => {
    const cpf = generateCPF();
    expect(cpf.length).toBe(11);
    expect(/^\d{11}$/.test(cpf)).toBe(true);
    expect(validateCPF(cpf)).toBe(true);
  });

  it("gera CPF válido com formatação", () => {
    const cpf = generateCPF(true);
    expect(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)).toBe(true);
    expect(validateCPF(cpf)).toBe(true);
  });

  it("gera múltiplos CPFs diferentes", () => {
    const cpf1 = generateCPF();
    const cpf2 = generateCPF();
    expect(cpf1).not.toBe(cpf2);
  });
});

describe("v1 generateCNPJ", () => {
  it("gera CNPJ numérico válido sem formatação", () => {
    const cnpj = generateCNPJ();
    expect(cnpj.length).toBe(14);
    expect(/^\d{14}$/.test(cnpj)).toBe(true);
    expect(validateCNPJ(cnpj)).toBe(true);
  });

  it("gera CNPJ numérico válido com formatação", () => {
    const cnpj = generateCNPJ(true);
    expect(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(cnpj)).toBe(true);
    expect(validateCNPJ(cnpj)).toBe(true);
  });

  it("gera múltiplos CNPJs diferentes", () => {
    const cnpj1 = generateCNPJ();
    const cnpj2 = generateCNPJ();
    expect(cnpj1).not.toBe(cnpj2);
  });
});

describe("v1 generateCNPJAlpha", () => {
  it("gera CNPJ alfanumérico válido sem formatação", () => {
    const cnpj = generateCNPJAlpha();
    expect(cnpj.length).toBe(14);
    expect(/^[A-Z0-9]{14}$/.test(cnpj)).toBe(true);
    expect(validateCNPJ(cnpj)).toBe(true);
  });

  it("gera CNPJ alfanumérico válido e pode formatar depois", () => {
    const cnpj = generateCNPJAlpha();
    const formatted = formatCNPJ(cnpj);
    expect(/^[A-Z0-9]{2}\.[A-Z0-9]{3}\.[A-Z0-9]{3}\/[A-Z0-9]{4}-\d{2}$/.test(formatted)).toBe(true);
    expect(validateCNPJ(formatted)).toBe(true);
  });

  it("não gera letras proibidas (I, O, U, Q, F)", () => {
    for (let i = 0; i < 100; i++) {
      const cnpj = generateCNPJAlpha();
      expect(/[IOUQF]/.test(cnpj)).toBe(false);
    }
  });

  it("gera múltiplos CNPJs alfanuméricos diferentes", () => {
    const cnpj1 = generateCNPJAlpha();
    const cnpj2 = generateCNPJAlpha();
    expect(cnpj1).not.toBe(cnpj2);
  });
});
