flowchart TD
    A([Início]) --> B[Iniciar missão]
    B --> C[Embaralhar situações]
    C --> D[Apresentar pergunta]
    D --> E[Mostrar alternativas]
    E --> F[Estudante escolhe resposta]
    F --> G{Resposta correta?}
    G -->|Sim| H[Adicionar 1 ponto]
    G -->|Não| I[Mostrar explicação]
    H --> I
    I --> J{Existem perguntas?}
    J -->|Sim| D
    J -->|Não| K[Calcular resultado]
    K --> L[Mostrar pontuação]
    L --> M{Jogar novamente?}
    M -->|Sim| B
    M -->|Não| N([Fim])