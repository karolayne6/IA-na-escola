import { situacoes } from "./dados.js";

// Organiza as situações de forma aleatória
export function embaralhar(lista) {

    const copia = [...lista];

    for (let i = copia.length - 1; i > 0; i--) {

        const aleatorio = Math.floor(
            Math.random() * (i + 1)
        );

        [copia[i], copia[aleatorio]] =
            [copia[aleatorio], copia[i]];
    }

    return copia;
}

// Limpa espaços repetidos usando replace()
export function limparTexto(texto) {

    return texto
        .trim()
        .replace(/\s+/g, " ");
}

// Confere se todas as situações possuem dados válidos
export function validarSituacoes(lista) {

    for (const situacao of lista) {

        if (
            !situacao.pergunta ||
            !Array.isArray(situacao.opcoes) ||
            situacao.opcoes.length < 2 ||
            !Number.isInteger(situacao.correta) ||
            situacao.correta < 0 ||
            situacao.correta >= situacao.opcoes.length
        ) {
            return false;
        }
    }

    return true;
}

// Cria uma lista de situações para a missão
export function criarMissao() {

    if (!validarSituacoes(situacoes)) {
        return [];
    }

    return embaralhar(situacoes);
}