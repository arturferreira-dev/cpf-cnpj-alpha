import { describe, expect, test } from "bun:test";
import { anonymizeCNPJ, anonymizeCPF, anonymizeCpfCnpj } from "../src/v1";

describe("anonymizeCPF", () => {
  test("anonimiza CPF numérico", () => {
    expect(anonymizeCPF("12345678901")).toBe("123.***.***-01");
  });

  test("anonimiza CPF já mascarado", () => {
    expect(anonymizeCPF("123.456.789-01")).toBe("123.***.***-01");
  });

  test("retorna o valor original para tamanho inválido", () => {
    expect(anonymizeCPF("123")).toBe("123");
  });

  test("anonimiza CPF acima do permitido (trunca)", () => {
    expect(anonymizeCPF("123456789012")).toBe("123.***.***-01");
  });
});

describe("anonymizeCNPJ", () => {
  test("anonimiza CNPJ numérico", () => {
    expect(anonymizeCNPJ("12345678000199")).toBe("12.345.***/****-99");
  });

  test("anonimiza CNPJ alfanumérico", () => {
    expect(anonymizeCNPJ("ab12cd34ef5601")).toBe("AB.12C.***/****-01");
  });

  test("anonimiza CNPJ com separadores", () => {
    expect(anonymizeCNPJ("AB.12C.D34/EF56-01")).toBe("AB.12C.***/****-01");
  });

  test("retorna o valor original para tamanho inválido", () => {
    expect(anonymizeCNPJ("ABC123")).toBe("ABC123");
  });

  test("anonimiza CNPJ acima do permitido (trunca)", () => {
    expect(anonymizeCNPJ("AB12CD34EF560199")).toBe("AB.12C.***/****-01");
  });
});

describe("anonymizeCpfCnpj", () => {
  test("detecta e anonimiza CPF", () => {
    expect(anonymizeCpfCnpj("12345678901")).toBe("123.***.***-01");
  });

  test("detecta e anonimiza CNPJ numérico", () => {
    expect(anonymizeCpfCnpj("12345678000199")).toBe("12.345.***/****-99");
  });

  test("detecta e anonimiza CNPJ alfanumérico", () => {
    expect(anonymizeCpfCnpj("ab12cd34ef5601")).toBe("AB.12C.***/****-01");
  });

  test("retorna o valor original para valor que não seja CPF/CNPJ", () => {
    expect(anonymizeCpfCnpj("1234567890")).toBe("1234567890");
  });

  test("anonimiza valor acima do permitido com máscara CNPJ", () => {
    expect(anonymizeCpfCnpj("123456789012345")).toBe("12.345.***/****-34");
  });
});
