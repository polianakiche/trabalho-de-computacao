
const livros = [
  { titulo: "Confissões", autor: "Santo Agostinho", capa: "imagens/confissoes.jpg" },
  { titulo: "O Outono da Idade Média", autor: "Johan Huizinga", capa: "imagens/outono-idade-media.jpg" },
  { titulo: "O Retrato de Dorian Gray", autor: "Oscar Wilde", capa: "imagens/dorian-gray.jpg" },
  { titulo: "Orlando", autor: "Virginia Woolf", capa: "imagens/orlando.png" },
  { titulo: "O Grande Gatsby", autor: "F. Scott Fitzgerald", capa: "imagens/grande-gatsby.jpg" },
  { titulo: "O Príncipe", autor: "Nicolau Maquiavel", capa: "imagens/o-principe.jpg" },
  { titulo: "1984", autor: "George Orwell", capa: "imagens/1984.jpg" },
  { titulo: "O Quarto de Jacob", autor: "Virginia Woolf", capa: "imagens/quarto-jacob.jpg" },
  { titulo: "Frankenstein", autor: "Mary Shelley", capa: "imagens/frankenstein.jpg" },
  { titulo: "O Idiota", autor: "Fiódor Dostoiévski", capa: "imagens/o-idiota.png" },
  { titulo: "Orgulho e Preconceito", autor: "Jane Austen", capa: null },
  { titulo: "O Morro dos Ventos Uivantes", autor: "Emily Brontë", capa: null },
  { titulo: "Romeu e Julieta", autor: "William Shakespeare", capa: null },
  { titulo: "Ilíada", autor: "Homero", capa: null },
  { titulo: "Odisseia", autor: "Homero", capa: null },
  { titulo: "Os Irmãos Karamázov", autor: "Fiódor Dostoiévski", capa: null },
  { titulo: "Drácula", autor: "Bram Stoker", capa: null },
  { titulo: "Jane Eyre", autor: "Charlotte Brontë", capa: null },
  { titulo: "Meditações", autor: "Marco Aurélio", capa: null },
  { titulo: "O Manifesto do Partido Comunista", autor: "Karl Marx e Friedrich Engels", capa: null }
];

const estante = document.querySelector(".estante");
const lista = document.querySelector("#lista-leitura");
const contador = document.querySelector("#contador");

const selecionados = new Set();

// Cria a quarta prateleira automaticamente, se necessário.
let prateleiras = Array.from(document.querySelectorAll(".prateleira .livros"));

if (prateleiras.length < 4) {
  const novaPrateleira = document.createElement("div");
  novaPrateleira.className = "prateleira";

  const novaLinha = document.createElement("div");
  novaLinha.className = "livros";
  novaLinha.id = "prateleira-4";

  novaPrateleira.appendChild(novaLinha);
  estante.appendChild(novaPrateleira);

  prateleiras = Array.from(document.querySelectorAll(".prateleira .livros"));
}

// Cria os 20 livros nas quatro prateleiras.
livros.forEach((livro, indice) => {
  const prateleira = prateleiras[Math.floor(indice / 5)];

  const botao = document.createElement("button");
  botao.className = "livro";
  botao.type = "button";
  botao.title = `${livro.titulo} — ${livro.autor}`;
  botao.setAttribute("aria-label", `Adicionar ${livro.titulo} à lista`);

  if (livro.capa) {
    const imagem = document.createElement("img");
    imagem.src = livro.capa;
    imagem.alt = `Capa de ${livro.titulo}`;

    imagem.onerror = () => {
      imagem.remove();
      criarCapaProvisoria(botao, livro);
    };

    botao.appendChild(imagem);
  } else {
    criarCapaProvisoria(botao, livro);
  }

  botao.addEventListener("click", () => {
    if (selecionados.has(indice)) {
      selecionados.delete(indice);
      botao.classList.remove("selecionado");
    } else {
      selecionados.add(indice);
      botao.classList.add("selecionado");
    }

    atualizarLista();
  });

  prateleira.appendChild(botao);
});

// Cria uma capa preta provisória para os livros sem imagem.
function criarCapaProvisoria(botao, livro) {
  const capa = document.createElement("div");
  capa.className = "capa-provisoria";

  const titulo = document.createElement("span");
  titulo.textContent = livro.titulo;

  const autor = document.createElement("small");
  autor.textContent = livro.autor;

  capa.appendChild(titulo);
  capa.appendChild(autor);
  botao.appendChild(capa);
}

// Atualiza a lista de leitura e o contador.
function atualizarLista() {
  lista.innerHTML = "";

  if (selecionados.size === 0) {
    const mensagem = document.createElement("p");
    mensagem.className = "lista-vazia";
    mensagem.textContent = "Sua lista de leitura está vazia...";
    lista.appendChild(mensagem);
  }

  selecionados.forEach((indice) => {
    const livro = livros[indice];

    const item = document.createElement("div");
    item.className = "item-lista";

    const informacoes = document.createElement("div");
    informacoes.className = "info-livro";

    const titulo = document.createElement("strong");
    titulo.textContent = livro.titulo;

    const autor = document.createElement("small");
    autor.textContent = livro.autor;

    informacoes.appendChild(titulo);
    informacoes.appendChild(autor);

    const remover = document.createElement("button");
    remover.className = "remover-livro";
    remover.type = "button";
    remover.textContent = "×";
    remover.setAttribute("aria-label", `Remover ${livro.titulo}`);

    remover.addEventListener("click", () => {
      selecionados.delete(indice);

      const botoes = document.querySelectorAll(".livro");
      botoes[indice].classList.remove("selecionado");

      atualizarLista();
    });

    item.appendChild(informacoes);
    item.appendChild(remover);
    lista.appendChild(item);
  });

  contador.textContent = `${selecionados.size} ${
    selecionados.size === 1 ? "livro selecionado" : "livros selecionados"
  }`;
}

atualizarLista();
