import { criarMissao } from "./funcoes.js";
import { limparTexto } from "./funcoes.js";

// Elementos da página
const titulo = document.getElementById("titulo");
const pergunta = document.getElementById("pergunta");
const opcoes = document.getElementById("opcoes");
const feedback = document.getElementById("feedback");

const numero = document.getElementById("numero");
const pontos = document.getElementById("pontos");
const barra = document.getElementById("barra");

const iniciar = document.getElementById("iniciar");
const proxima = document.getElementById("proxima");
const reiniciar = document.getElementById("reiniciar");

// Variáveis da missão
let missao = [];
let indice = 0;
let pontuacao = 0;
let respondido = false;

// Inicia uma nova missão
function iniciarMissao() {

    missao = criarMissao();

    if (missao.length === 0) {
        titulo.textContent = "Não foi possível iniciar";
        pergunta.textContent =
            "Verifique os dados das situações e tente novamente.";
        return;
    }

    indice = 0;
    pontuacao = 0;

    iniciar.hidden = true;
    reiniciar.hidden = true;

    mostrarSituacao();
}

// Apresenta a situação atual
function mostrarSituacao() {

    respondido = false;

    const atual = missao[indice];

    titulo.textContent = "Analise a situação!";
    pergunta.textContent = limparTexto(atual.pergunta);

    numero.textContent =
        `Missão ${indice + 1} de ${missao.length}`;

    pontos.textContent = `Pontos: ${pontuacao}`;

    barra.style.width =
        `${(indice / missao.length) * 100}%`;

    feedback.textContent = "";

    opcoes.replaceChildren();

    atual.opcoes.forEach((texto, posicao) => {

        const botao = document.createElement("button");

        botao.className = "opcao";
        botao.textContent = limparTexto(texto);

        botao.addEventListener("click", () => {
            verificarResposta(posicao, botao);
        });

        opcoes.appendChild(botao);
    });

    proxima.hidden = true;
}

// Verifica a resposta escolhida
function verificarResposta(escolha, botaoEscolhido) {

    if (respondido) return;

    respondido = true;

    const atual = missao[indice];

    const acertou = escolha === atual.correta;

    if (acertou) {
        pontuacao++;
        feedback.textContent = "✅ Resposta correta! " +
            atual.explicacao;
    } else {
        feedback.textContent = "❌ Resposta incorreta. " +
            atual.explicacao;
    }

    // Desativa as alternativas após a escolha
    const botoes = opcoes.querySelectorAll("button");

    for (const botao of botoes) {

        botao.disabled = true;

        if (
            Number(
                [...botoes].indexOf(botao)
            ) === atual.correta
        ) {
            botao.classList.add("correta");
        }
    }

    if (!acertou) {
        botaoEscolhido.classList.add("incorreta");
    }

    pontos.textContent = `Pontos: ${pontuacao}`;

    proxima.hidden = false;
}

// Avança para a próxima situação
function avancar() {

    indice++;

    if (indice < missao.length) {
        mostrarSituacao();
    } else {
        finalizarMissao();
    }
}

// Mostra o resultado final
function finalizarMissao() {

    titulo.textContent = "Missão concluída! 🎉";

    pergunta.textContent =
        `Você acertou ${pontuacao} de ${missao.length} situações.`;

    numero.textContent = "Resultado final";

    barra.style.width = "100%";

    opcoes.replaceChildren();

    feedback.textContent =
        pontuacao === missao.length
            ? "Excelente! Você demonstrou conhecimento sobre o uso responsável da IA."
            : pontuacao >= 3
                ? "Bom trabalho! Continue desenvolvendo seu pensamento crítico."
                : "Continue aprendendo! Reveja as orientações e tente novamente.";

    proxima.hidden = true;
    reiniciar.hidden = false;
}

// Eventos dos botões
iniciar.addEventListener("click", iniciarMissao);

proxima.addEventListener("click", avancar);

reiniciar.addEventListener("click", iniciarMissao);