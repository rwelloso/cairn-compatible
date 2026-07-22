# Cairn (pt-BR) — Notas desta atualização

Este pacote é uma atualização do sistema [Cairn-FoundryVTT](https://github.com/yochaigal/Cairn-FoundryVTT)
(clonado a partir do `master` em 22/07/2026) com foco em compatibilidade com o Foundry VTT v13,
localização completa em português do Brasil e conteúdo de compêndio baseado no *Cairn: Edição Básica*
(pt-BR, v1.4, licença CC BY-SA 4.0).

## Instalação

1. Renomeie a pasta descompactada para `cairn` (o Foundry espera esse nome exato para o sistema).
2. Copie a pasta para `Data/systems/` na sua instalação do Foundry VTT (ou compacte como `.zip` e
   instale via manifesto local).
3. Se você já tem um mundo Cairn em português, faça backup antes — o formato do campo de ouro mudou
   (veja "Moedas" abaixo) e alguns arquivos de idioma/tabelas foram sobrescritos.
4. Após instalar, importe a pasta de compêndio **"Cairn - Edição Básica (PT-BR)"** para o seu mundo
   (Itens, Tabelas e Referência).

## 1. Compatibilidade com Foundry v13

O `master` do repositório original já declarava suporte ao v13 (`compatibility.minimum: "13"`,
verificado em `13.346`) e o código já usa as APIs corretas (`foundry.applications.*`,
`foundry.utils.*`, `renderChatMessageHTML`, `DialogV2`, etc.) — não foi necessário reescrever a
base de sheets. Os pontos que de fato precisavam de correção:

- **Bug de schema em `cost`**: todos os sheets (item, arma, armadura, recipiente) já liam
  `system.cost.value`, mas o `template.json` definia `cost` como número simples. Corrigido para
  `{ "value": 0 }`, consistente em todos os tipos.
- **`lang/pt-BR.json` usava chaves antigas** (`ACTOR.TypeCharacter` etc.) em vez do formato atual
  `TYPES.Actor.character`, o que quebrava a exibição do tipo de personagem em português. Corrigido.
- **`lang/pt-BR.json` estava incompleto** (73 de 85 chaves do `en.json`). Reescrito por completo;
  agora `en.json` e `pt-BR.json` têm paridade total de chaves.

## 2. Setting: rolagem automática de Cicatrizes

Em **Configurar Definições → Cairn**, novo toggle **"Rolar cicatrizes automaticamente"**
(`auto-roll-scars`, ligado por padrão). Quando a Guarda (PG) de um personagem chega a 0:
- **Ligado**: rola automaticamente na tabela de Cicatrizes, como já acontecia antes.
- **Desligado**: não rola nada e não mostra nenhum aviso — o Guardião resolve manualmente.

## 3. Moedas (antes "Ouro")

O campo antes chamado "Ouro"/"Gold" na ficha agora se chama **"Moedas"/"Coins"** e é **somente
leitura**: seu valor é a soma automática da quantidade de quatro itens de inventário sem peso —
**Moedas de Cobre, Moedas de Prata, Moedas de Ouro, Moedas Outro** (Copper/Silver/Gold/Other Coins
no compêndio `extra`, e os equivalentes traduzidos em `ptbr-itens`). A regra opcional de peso por
limite de moedas (setting "Usar limite de peso para moedas") continua funcionando normalmente,
agora medindo a soma desses itens em vez de um número digitado à mão.

Qualquer item pode ser marcado como moeda pelo checkbox **"Moeda"** na ficha do item
(`system.currency`), não só os quatro criados por padrão.

**Migração**: personagens existentes que tinham ouro no campo antigo vão mostrar 0 em "Moedas" até
que você adicione os itens de moeda correspondentes ao inventário deles com a quantidade certa.

## 4. Vantagem/Desvantagem e Prejudicado/Aprimorado

- **Testes de atributo** (clicar em FOR/DES/VON na ficha): abre uma janela com **Vantagem**
  (`2d20`, fica com o menor — melhor num sistema "role por baixo"), **Normal** (`1d20`) e
  **Desvantagem** (`2d20`, fica com o maior).
- **Dano de arma** (clicar no ícone de dado ao lado de uma arma equipada, ou usar uma macro de
  hotbar): abre uma janela com **Prejudicado** (`1d4`, ignorando o dado da arma), **Normal**
  (dado da arma) e **Aprimorado** (`1d12`), conforme a regra de "Modificadores de Ataque" do livro.
  Se a condição de pânico estiver ativa e o personagem estiver em pânico, o ataque continua
  automaticamente prejudicado sem abrir a janela, como já acontecia antes.

## 5. Compêndio "Cairn - Edição Básica (PT-BR)"

Três novos pacotes, agrupados na pasta de compêndio **"Cairn - Edição Básica (PT-BR)"**, com
conteúdo transcrito do PDF anexado (Cairn Edição Básica, tradução de Rafa Arruda):

- **PT-BR: Itens** (227 documentos) — 15 armas, 6 armaduras, 100 itens da tabela de Equipamento
  Adicional (com preços cruzados da tabela de Mercado onde há correspondência clara), 4 itens de
  moeda, Rações e Tocha, e os 100 Livros de Feitiço.
- **PT-BR: Tabelas** (18 rolagens) — Físico, Pele, Cabelo, Rosto, Fala, Roupas, Virtude e Vício
  (d10 cada); Nomes Próprios e Sobrenomes (d100 cada, dois rolamentos independentes em vez de pares
  fixos, para mais variedade); Antecedentes (d100); Cicatrizes (a mesma mecânica de Cicatrizes de
  antes, mas em português); Armas (d6, com sub-tabelas aninhadas para as categorias com mais de uma
  opção) e Armadura (d6), ambas já vinculadas aos itens acima.
- **PT-BR: Referência** (1 registro de diário) — os 6 Pacotes de Equipamento por Arquétipo
  (Bardo, Caçador, Curandeiro, Guerreiro, Ladrão, Mago) e a tabela de Mercado para
  transporte/acomodações/contratados, que não fazem sentido como itens de inventário.

### Gerador de personagem em português

O botão "Gerar personagem" agora detecta automaticamente o idioma ativo do Foundry: se for
português, usa as tabelas do `ptbr-itens`/`ptbr-tabelas` acima (seguindo exatamente os passos de
criação de personagem do Cairn Edição Básica); em qualquer outro idioma, continua usando o SRD em
inglês, sem nenhuma mudança de comportamento.

## 6. Conteúdo adicional: Mais Livros de Feitiço e Mais Relíquias

Dois novos pacotes de compêndio, traduzidos de
[cairnrpg.com/resources/more-spellbooks](https://cairnrpg.com/resources/more-spellbooks/) e
[cairnrpg.com/resources/more-relics](https://cairnrpg.com/resources/more-relics/)
(conteúdo do site oficial do Cairn, licenciado sob CC BY-SA 4.0):

- **PT-BR: Mais Livros de Feitiço** (216 itens) — a tabela d666 completa de feitiços extras do
  site oficial, cada um como um item do tipo Livro de Feitiço.
- **PT-BR: Mais Relíquias** (126 itens) — todas as relíquias da página, incluindo as armas com
  dado de dano próprio (tipo Arma) e as demais como itens gerais, com o número de cargas indicado
  no nome quando aplicável. Cada descrição termina com uma nota de **Fonte**, preservando a
  atribuição e o link externo exatamente como aparecem na página original: Glass Bird Games
  ([glassbirdgames.blogspot.com](https://glassbirdgames.blogspot.com/)), Ialath
  ([ialath.com](https://ialath.com/)) e o Discord do NSR (sem link na página de origem).

Uma terceira página foi adicionada ao registro de diário **"Cairn - Edição Básica: Referência"**,
listando as fontes de inspiração citadas na página de Mais Livros de Feitiço (Chris McDowall, Mike
Evans, Goblin Punch, d20 SRD, SRD e OGL 5.1 da Wizards of the Coast, Black Hack SRD, e a lista de
feitiços da 5e de tadzik), com os mesmos links da página original.

## 7. Índice de Feitiços (A-Z)

Nova tabela de rolagem reunindo **todos** os Livros de Feitiço do sistema (os 100 do Cairn Edição
Básica + os 216 de Mais Livros de Feitiço = 316 no total), em ordem alfabética e numerados de 1 a
316, para quem quiser sortear um feitiço qualquer aleatoriamente em vez de usar as tabelas
temáticas separadas.

- **Português**: tabela **"Índice de Feitiços (A-Z)"**, adicionada ao pacote `PT-BR: Tabelas`.
- **Inglês**: tabela equivalente **"Spell Index (A-Z)"**, adicionada ao pacote `utils` (junto com a
  tabela de Scars), reunindo os 100 Spellbooks + 216 More Spellbooks em inglês — mantendo a versão
  em inglês em paridade com a em português, como vínhamos fazendo até aqui.

Cada entrada da tabela aponta diretamente para o item correspondente (rolar sorteia e mostra o
Livro de Feitiço já pronto para arrastar para a ficha), em vez de ser apenas uma lista de nomes.
