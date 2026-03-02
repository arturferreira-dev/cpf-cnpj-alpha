# cpf-cnpj-alpha — formatar, validar, anonimizar e remover máscara de CPF/CNPJ

[![Build](https://github.com/arturferreira-dev/cpf-cnpj-alpha/actions/workflows/build.yml/badge.svg)](https://github.com/arturferreira-dev/cpf-cnpj-alpha/actions/workflows/build.yml)
[![Coverage](https://codecov.io/gh/arturferreira-dev/cpf-cnpj-alpha/branch/main/graph/badge.svg)](https://codecov.io/gh/arturferreira-dev/cpf-cnpj-alpha)


Biblioteca TypeScript para CPF e CNPJ (incluindo CNPJ alfanumérico): formatação, validação, geração, anonimização e unmask.

## Recursos

- Formatar CPF, CNPJ numérico e CNPJ alfanumérico.
- Validar CPF/CNPJ com ou sem máscara.
- Gerar CPF, CNPJ numérico e CNPJ alfanumérico válidos.
- Anonimizar documentos para logs e UI.
- Remover máscara com `unmaskCPF` e `unmaskCNPJ`.

## Instalação

```bash
npm install cpf-cnpj-alpha
```

## Exports

```ts
import { 
  formatCPF, 
  formatCNPJ, 
  formatCpfCnpj,
  unmaskCPF,
  unmaskCNPJ,
  anonymizeCPF,
  anonymizeCNPJ,
  anonymizeCpfCnpj,
  validateCPF,
  validateCNPJ,
  validateCpfCnpj,
  generateCPF,
  generateCNPJ,
  generateCNPJAlpha
} from "cpf-cnpj-alpha";
import { validateCPF as validateCPFv1 } from "cpf-cnpj-alpha/v1";
```

## API

Cada função recebe `string` e retorna `string` (tipado via arquivos `.d.ts` gerados no build).

### `formatCPF(value?: string | null): string`
- `undefined` ou `null`: retorna string vazia (`""`).
- Remove caracteres não numéricos.
- Menos de 11 dígitos: retorna o valor original.
- Mais de 11 dígitos: trunca para 11 e aplica máscara.
- Máscara: `000.000.000-00`.

### `formatCNPJ(value?: string | null): string`
- `undefined` ou `null`: retorna string vazia (`""`).
- Remove caracteres não alfanuméricos.
- Normaliza letras para maiúsculas.
- Menos de 14 caracteres alfanuméricos: retorna o valor original.
- Mais de 14 caracteres alfanuméricos: trunca para 14 e aplica máscara.
- Máscara: `00.000.000/0000-00`.

### `formatCpfCnpj(value?: string | null): string`
- `undefined` ou `null`: retorna string vazia (`""`).
- 11 dígitos: formata como CPF.
- 14 alfanuméricos: formata como CNPJ.
- Acima de 14 alfanuméricos: trunca para 14 e formata com máscara CNPJ (a maior).
- Outros casos: retorna o valor original.

### `unmaskCPF(value?: string | null): string`
- `undefined` ou `null`: retorna string vazia (`""`).
- Remove caracteres não numéricos.
- Menos de 11 dígitos: retorna o valor original.
- Mais de 11 dígitos: trunca para 11.

### `unmaskCNPJ(value?: string | null): string`
- `undefined` ou `null`: retorna string vazia (`""`).
- Remove caracteres não alfanuméricos.
- Normaliza letras para maiúsculas.
- Menos de 14 caracteres alfanuméricos: retorna o valor original.
- Mais de 14 caracteres alfanuméricos: trunca para 14.

### `anonymizeCPF(value: string): string`
- Remove caracteres não numéricos.
- Aplica máscara de anonimização mostrando apenas 3 primeiros e 2 últimos dígitos.
- Máscara: `123.***.***-01`.

### `anonymizeCNPJ(value: string): string`
- Remove caracteres não alfanuméricos.
- Normaliza letras para maiúsculas.
- Aplica máscara de anonimização mostrando apenas início e 2 últimos caracteres.
- Máscara: `12.345.***/****-99`.

### `anonymizeCpfCnpj(value: string): string`
- 11 dígitos: anonimiza como CPF.
- 14+ alfanuméricos: anonimiza como CNPJ.
- Outros casos: retorna o valor original.

### `validateCPF(value: string): boolean`
- Valida CPF usando algoritmo de Módulo 11 (conforme Receita Federal).
- Aceita com ou sem máscara (ex: `11144477735` ou `111.444.777-35`).
- Rejeita sequências repetidas (111.111.111-11).
- Retorna `true` se válido, `false` caso contrário.

**Estrutura validada:**
- 11 dígitos numéricos
- 9 primeiros dígitos: número de registro
- 2 últimos dígitos: dígitos verificadores (DV₁, DV₂)

**Algoritmo:**
- **DV₁**: Multiplica primeiros 9 dígitos por 10, 9, 8, ..., 2. Soma e calcula resto ÷ 11. Se resto < 2 → DV₁ = 0, senão DV₁ = 11 - resto.
- **DV₂**: Multiplica primeiros 10 dígitos (com DV₁) por 11, 10, 9, ..., 2. Soma e calcula resto ÷ 11. Se resto < 2 → DV₂ = 0, senão DV₂ = 11 - resto.

### `validateCNPJ(value: string): boolean`
- Valida CNPJ numérico ou alfanumérico usando algoritmo de Módulo 11.
- Aceita com ou sem máscara.
- Rejeita letras proibidas: **I, O, U, Q, F** (conforme Receita Federal).
- Retorna `true` se válido, `false` caso contrário.

**Estrutura validada:**
- **CNPJ Numérico**: 14 dígitos
- **CNPJ Alfanumérico**: 12 caracteres alfanuméricos + 2 dígitos verificadores numéricos

**Conversão de caracteres:**
- Números: 0-9 mantêm seus valores
- Conversão oficial Receita (ASCII): valor = `charCode - 48` (A=17, B=18, ..., Z=42)

### `validateCpfCnpj(value: string): boolean`
- Detecta automaticamente se é CPF ou CNPJ e valida.
- 11 dígitos → valida como CPF.
- 14+ caracteres alfanuméricos → valida como CNPJ.
- Outros tamanhos → retorna `false`.

### `generateCPF(formatted?: boolean): string`
- Gera um CPF válido aleatoriamente com checksum correto.
- 9 dígitos aleatórios + 2 dígitos verificadores calculados.
- Se `formatted=true`, retorna com máscara (XXX.XXX.XXX-XX).
- Se `formatted=false`, retorna apenas 11 dígitos.

### `generateCNPJ(formatted?: boolean): string`
- Gera um CNPJ numérico válido aleatoriamente com checksum correto.
- 12 dígitos aleatórios + 2 dígitos verificadores calculados (14 dígitos totais).
- Se `formatted=true`, retorna com máscara (XX.XXX.XXX/XXXX-XX).
- Se `formatted=false`, retorna apenas 14 dígitos.

### `generateCNPJAlpha(formatted?: boolean): string`
- Gera um CNPJ alfanumérico válido aleatoriamente com checksum correto.
- 12 caracteres alfanuméricos aleatórios + 2 dígitos verificadores numéricos (14 caracteres totais).
- **Não utiliza letras proibidas** (I, O, U, Q, F) - conforme Receita Federal.
- Caracteres permitidos: A-Z (exceto proibidas), 0-9.
- Se `formatted=true`, retorna com máscara (XX.XXX.XXX/XXXX-XX).
- Se `formatted=false`, retorna apenas 14 caracteres alfanuméricos.

## CNPJ alfanumérico

Referências oficiais da Receita Federal:

- Documento técnico: https://www.gov.br/receitafederal/pt-br/centrais-de-conteudo/publicacoes/apresentacoes/outros-eventos/cnpj-alfanumerico-escolha-tecnica.pdf
- Simulador oficial: https://servicos.receitafederal.gov.br/servico/cnpj-alfa/simular

Exemplo:

```ts
formatCNPJ("ab12cd34ef5601");
// AB.12C.D34/EF56-01
```

### Fluxo sugerido com simulador oficial

1. Formate o valor na aplicação com `formatCNPJ`.
2. Remova a máscara para obter os 14 caracteres alfanuméricos (ex.: `AB12CD34EF5601`).
3. Valide o resultado no simulador da Receita:
	https://servicos.receitafederal.gov.br/servico/cnpj-alfa/simular

Exemplo rápido:

```ts
const formatted = formatCNPJ("ab12cd34ef5601"); // AB.12C.D34/EF56-01
const raw = formatted.replace(/[^A-Z0-9]/g, ""); // AB12CD34EF5601
```

Ou usando a API dedicada de unmask:

```ts
import { unmaskCNPJ } from "cpf-cnpj-alpha";

unmaskCNPJ("AB.12C.D34/EF56-01"); // AB12CD34EF5601
```

## Exemplos de uso

### Formatação

```ts
import { formatCPF, formatCNPJ, formatCpfCnpj } from "cpf-cnpj-alpha";

// CPF
formatCPF("12345678901"); // 123.456.789-01
formatCPF("123.456.789-01"); // 123.456.789-01 (já formatado)

// CNPJ numérico
formatCNPJ("12345678000199"); // 12.345.678/0001-99

// CNPJ alfanumérico
formatCNPJ("AB12CD34EF5601"); // AB.12C.D34/EF56-01

// Auto-detectar
formatCpfCnpj("12345678901"); // 123.456.789-01 (CPF)
formatCpfCnpj("12345678000199"); // 12.345.678/0001-99 (CNPJ)
```

### Formatação com valor ausente (`undefined`/`null`)

```ts
import { formatCPF, formatCNPJ, formatCpfCnpj } from "cpf-cnpj-alpha";

formatCPF(undefined); // ""
formatCPF(null); // ""

formatCNPJ(undefined); // ""
formatCNPJ(null); // ""

formatCpfCnpj(undefined); // ""
formatCpfCnpj(null); // ""
```

### Remover máscara (Unmask)

```ts
import { unmaskCPF, unmaskCNPJ } from "cpf-cnpj-alpha";

unmaskCPF("123.456.789-01"); // 12345678901
unmaskCPF("12345678901"); // 12345678901

unmaskCNPJ("12.345.678/0001-99"); // 12345678000199
unmaskCNPJ("AB.12C.D34/EF56-01"); // AB12CD34EF5601
```

### Anonimização

```ts
import { anonymizeCPF, anonymizeCNPJ, anonymizeCpfCnpj } from "cpf-cnpj-alpha";

// Para logs, exibição em UI, auditoria
anonymizeCPF("12345678901"); // 123.***.***-01
anonymizeCNPJ("AB12CD34EF5601"); // AB.12C.***/****-01

// Auto-detectar
anonymizeCpfCnpj("12345678901"); // 123.***.***-01
anonymizeCpfCnpj("AB12CD34EF5601"); // AB.12C.***/****-01
```

### Fluxo completo (formato → anonimização → exibição)

```ts
import { formatCpfCnpj, anonymizeCpfCnpj } from "cpf-cnpj-alpha";

const userInput = "12345678901";
const formatted = formatCpfCnpj(userInput); // 123.456.789-01
const anonymous = anonymizeCpfCnpj(formatted); // 123.***.***-01

console.log(`Documento: ${anonymous}`); // Documento: 123.***.***-01
```

### Validação

```ts
import { validateCPF, validateCNPJ, validateCpfCnpj } from "cpf-cnpj-alpha";

// CPF
validateCPF("11144477735"); // true
validateCPF("111.444.777-35"); // true (com máscara)
validateCPF("12345678901"); // false (dígitos verificadores inválidos)
validateCPF("11111111111"); // false (sequência repetida)

// CNPJ numérico
validateCNPJ("11222333000181"); // true
validateCNPJ("11.222.333/0001-81"); // true (com máscara)
validateCNPJ("12345678000199"); // false (inválido)

// CNPJ alfanumérico
validateCNPJ("PD.RTZ.NY5/0001-25"); // true (válido, sem letras proibidas)
validateCNPJ("AI12CD34EG5691"); // false (contém letra proibida I)
validateCNPJ("AF12CD34EG5691"); // false (contém letra proibida F)

// Auto-detectar
validateCpfCnpj("11144477735"); // true (CPF válido)
validateCpfCnpj("PD.RTZ.NY5/0001-25"); // true (CNPJ alfanumérico válido)
validateCpfCnpj("123"); // false (tamanho inválido)
```

### Fluxo com validação antes de formatar

```ts
import { validateCpfCnpj, formatCpfCnpj, anonymizeCpfCnpj } from "cpf-cnpj-alpha";

const userInput = "11144477735";

if (validateCpfCnpj(userInput)) {
  const formatted = formatCpfCnpj(userInput);
  const anonymous = anonymizeCpfCnpj(formatted);
  console.log(`✓ Documento válido: ${anonymous}`);
} else {
  console.log(`✗ Documento inválido: ${userInput}`);
}
// Output: ✓ Documento válido: 111.***.***-35
```

### Geração

```ts
import { generateCPF, generateCNPJ, generateCNPJAlpha, validateCpfCnpj } from "cpf-cnpj-alpha";

// Gerar CPF válido
const cpf = generateCPF(); // "12345678901" (apenas dígitos)
const cpfFormatted = generateCPF(true); // "123.456.789-01" (com máscara)

// Gerar CNPJ numérico válido
const cnpj = generateCNPJ(); // "12345678000199" (apenas dígitos)
const cnpjFormatted = generateCNPJ(true); // "12.345.678/0001-99" (com máscara)

// Gerar CNPJ alfanumérico válido (sem letras proibidas I, O, U, Q, F)
const cnpjAlpha = generateCNPJAlpha(); // "AB12CD34EG5629" (com letras permitidas)
const cnpjAlphaFormatted = generateCNPJAlpha(true); // "AB.12C.D34/EG56-29" (com máscara)

// Todos os gerados são válidos
console.log(validateCpfCnpj(cpf)); // true
console.log(validateCpfCnpj(cnpj)); // true
console.log(validateCpfCnpj(cnpjAlpha)); // true
```

### Fluxo completo: Gerar → Validar → Formatar → Anonimizar

```ts
import { generateCPF, validateCPF, formatCPF, anonymizeCPF } from "cpf-cnpj-alpha";

// Gerar um novo CPF válido
const newCPF = generateCPF();
console.log(`CPF gerado: ${newCPF}`);

// Sempre será válido
if (validateCPF(newCPF)) {
  const formatted = formatCPF(newCPF);
  const anonymous = anonymizeCPF(formatted);
  
  console.log(`Formatado: ${formatted}`);
  console.log(`Anônimo (seguro para logs): ${anonymous}`);
}
// Output: 
// CPF gerado: 79610780881
// Formatado: 796.107.808-81
// Anônimo: 796.***.***-81
```
