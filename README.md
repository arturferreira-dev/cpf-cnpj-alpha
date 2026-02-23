# cpf-cnpj-alpha

Biblioteca TypeScript para formatação de CPF, CNPJ e CPF/CNPJ, com suporte a CNPJ alfanumérico.

## Instalação

```bash
npm install cpf-cnpj-alpha
```

## Exports

```ts
import { formatCPF, formatCNPJ, formatCpfCnpj } from "cpf-cnpj-alpha";
import { formatCPF as formatCPFv1 } from "cpf-cnpj-alpha/v1";
```

## API

Cada função recebe `string` e retorna `string` (tipado via arquivos `.d.ts` gerados no build).

### `formatCPF(value: string): string`
- Remove caracteres não numéricos.
- Menos de 11 dígitos: retorna o valor original.
- Mais de 11 dígitos: trunca para 11 e aplica máscara.
- Máscara: `000.000.000-00`.

### `formatCNPJ(value: string): string`
- Remove caracteres não alfanuméricos.
- Normaliza letras para maiúsculas.
- Menos de 14 caracteres alfanuméricos: retorna o valor original.
- Mais de 14 caracteres alfanuméricos: trunca para 14 e aplica máscara.
- Máscara: `00.000.000/0000-00`.

### `formatCpfCnpj(value: string): string`
- 11 dígitos: formata como CPF.
- 14 alfanuméricos: formata como CNPJ.
- Acima de 14 alfanuméricos: trunca para 14 e formata com máscara CNPJ (a maior).
- Outros casos: retorna o valor original.

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

