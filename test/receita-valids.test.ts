import { describe, it, expect } from "bun:test";
import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { validateCNPJ, validateCpfCnpj } from "../src/v1";

function parseSemicolonSeparatedCnpjs(filePath: string): string[] {
  return readFileSync(filePath, "utf8")
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean);
}

describe("cnpjs gerados list", () => {
  it("valida todos os CNPJs dos arquivos cnpjs-gerados-* (pontuados e nao-pontuados)", () => {
    const testDir = import.meta.dir;
    const files = readdirSync(testDir).filter((name) => /^cnpjs-gerados-.*-(pontuados|nao-pontuados)\.txt$/.test(name));
    const pontuadosFile = files.find((name) => /-pontuados\.txt$/.test(name) && !/-nao-pontuados\.txt$/.test(name));
    const naoPontuadosFile = files.find((name) => /-nao-pontuados\.txt$/.test(name));

    expect(pontuadosFile).toBeDefined();
    expect(naoPontuadosFile).toBeDefined();

    const pontuados = parseSemicolonSeparatedCnpjs(resolve(testDir, pontuadosFile!));
    const naoPontuados = parseSemicolonSeparatedCnpjs(resolve(testDir, naoPontuadosFile!));

    expect(pontuados.length).toBeGreaterThan(0);
    expect(naoPontuados.length).toBeGreaterThan(0);

    for (const [index, document] of pontuados.entries()) {
      expect(validateCNPJ(document), `validateCNPJ (pontuado) falhou no índice ${index}: ${document}`).toBe(true);
      expect(validateCpfCnpj(document), `validateCpfCnpj (pontuado) falhou no índice ${index}: ${document}`).toBe(true);
    }

    for (const [index, document] of naoPontuados.entries()) {
      expect(validateCNPJ(document), `validateCNPJ (não pontuado) falhou no índice ${index}: ${document}`).toBe(true);
      expect(validateCpfCnpj(document), `validateCpfCnpj (não pontuado) falhou no índice ${index}: ${document}`).toBe(true);
    }
  });
});
