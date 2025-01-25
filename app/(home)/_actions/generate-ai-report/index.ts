"use server";

import { db } from "@/app/_lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import OpenAI from "openai";
import { generateAiReportSchema, GenerateAiReportSchema } from "./schema";

// Função para gerenciar retries com um delay entre tentativas
const retryRequest = async <T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 1000,
): Promise<T> => {
  let lastError: unknown = null;
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  if (lastError instanceof Error) {
    throw lastError;
  }
  throw new Error("Unknown error occurred");
};

const DUMMY_REPORT =
  '### Relatório de Finanças Pessoais\n\n#### Resumo Geral das Finanças\nAs transações listadas foram analisadas e as seguintes informações foram extraídas para oferecer insights sobre suas finanças:\n\n- **Total de despesas:** R$ 19.497,56\n- **Total de investimentos:** R$ 14.141,47\n- **Total de depósitos/correntes:** R$ 10.100,00 (considerando depósitos de salário e outros)\n- **Categoria de maior despesa:** Alimentação\n\n#### Análise por Categoria\n\n1. **Alimentação:** R$ 853,76\n2. **Transporte:** R$ 144,05\n3. **Entretenimento:** R$ 143,94\n4. **Outras despesas:** R$ 17.828,28 (inclui categorias como saúde, educação, habitação)\n\n#### Tendências e Insights\n- **Despesas Elevadas em Alimentação:** A categoria de alimentação representa uma parte significativa de suas despesas, com um total de R$ 853,76 nos últimos meses. É importante monitorar essa categoria para buscar economia.\n  \n- **Despesas Variáveis:** Outros tipos de despesas, como entretenimento e transporte, também se acumulam ao longo do mês. Identificar dias em que se gasta mais pode ajudar a diminuir esses custos.\n  \n- **Investimentos:** Você fez investimentos significativos na ordem de R$ 14.141,47. Isso é um bom sinal para a construção de patrimônio e aumento de sua segurança financeira no futuro.\n  \n- **Categorização das Despesas:** Há uma série de despesas listadas como "OUTRA", que podem ser reavaliadas. Classificar essas despesas pode ajudar a ter um controle melhor das finanças.\n\n#### Dicas para Melhorar Sua Vida Financeira\n\n1. **Crie um Orçamento Mensal:** Defina um limite de gastos para cada categoria. Isso ajuda a evitar gastos excessivos em áreas como alimentação e entretenimento.\n\n2. **Reduza Gastos com Alimentação:** Considere cozinhar em casa com mais frequência, planejar refeições e usar listas de compras para evitar compras impulsivas.\n\n3. **Revise Despesas Recorrentes:** Dê uma olhada nas suas despesas fixas (como saúde e educação) para verificar se estão adequadas às suas necessidades e se há espaço para redução.\n\n4. **Estabeleça Metas de Poupança:** Com base em seus depósitos e investimentos, estabeleça metas específicas para economizar uma porcentagem do seu rendimento mensal. Estimar quanto você pode economizar pode ajudar a garantir uma reserva de emergência.\n\n5. **Diminua os Gastos com Entretenimento:** Planeje lazer de forma que não exceda seu orçamento, busque opções gratuitas ou de baixo custo. Lembre-se de que entretenimento também pode ser feito em casa.\n\n6. **Reavalie Seus Investimentos:** Certifique-se de que seus investimentos estejam alinhados com seus objetivos financeiros a curto e longo prazo. Pesquise alternativas que podem oferecer melhor retorno.\n\n7. **Acompanhe Suas Finanças Regularmente:** Use aplicativos de gerenciamento financeiro para controlar suas despesas e receitas, ajudando você a manter-se informado sobre sua saúde financeira.\n\n#### Conclusão\nMelhorar sua vida financeira é um processo contínuo que envolve planejamento, monitoramento e ajustes regulares. Com as análises e as sugestões acima, você pode começar a tomar decisões financeiras mais estratégicas para alcançar seus objetivos. Lembre-se que cada real economizado é um passo a mais em direção à segurança financeira!';

export const generateAiReport = async ({
  month,
  year,
}: GenerateAiReportSchema) => {
  // Validar entrada
  generateAiReportSchema.parse({ month, year });

  const { userId } = await auth();
  console.log("UserID:", userId); // Log para verificar o userId
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await clerkClient().users.getUser(userId);
  console.log("Plano do usuário:", user.publicMetadata.subscriptionPlan); // Verifique o plano do usuário

  const hasPremiumPlan = user.publicMetadata.subscriptionPlan === "premium";
  if (!hasPremiumPlan) {
    throw new Error("You need a premium plan to generate AI reports");
  }

  // Garantir que o userId seja válido antes de usar na consulta
  if (!userId) {
    throw new Error("Invalid userId");
  }

  // Verificando se a chave de API do OpenAI está definida
  console.log("API Key do OpenAI:", process.env.OPENAI_API_KEY); // Verifique se a chave de API está correta
  if (!process.env.OPENAI_API_KEY) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return DUMMY_REPORT;
  }

  const openAi = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // Ajuste para buscar transações com base no mês, ano e userId
  console.log("Consultando transações...");

  const transactions = await db.transaction.findMany({
    where: {
      userId: userId as string, // Garantir que o userId seja tratado como string
      date: {
        gte: new Date(`${year}-${month}-01`),
        lt: new Date(`${year}-${month}-31`),
      },
    },
    take: 1000, // Limite de transações para não sobrecarregar
  });

  console.log("Transações encontradas:", transactions); // Verifique as transações retornadas

  // Criar conteúdo para o ChatGPT
  const content = `Gere um relatório com insights sobre as minhas finanças, com dicas e orientações de como melhorar minha vida financeira. As transações estão divididas por ponto e vírgula. A estrutura de cada uma é {DATA}-{TIPO}-{VALOR}-{CATEGORIA}. São elas:
    ${transactions
      .map(
        (transaction) =>
          `${transaction.date.toLocaleDateString("pt-BR")}-R$${transaction.amount}-${transaction.type}-${transaction.category}`,
      )
      .join(";")};`;

  try {
    const completion = await retryRequest(async () => {
      return await openAi.chat.completions.create({
        model: "gpt-4o-mini", // Usando o modelo gpt-4o-mini
        messages: [
          {
            role: "system",
            content:
              "Você é um especialista em gestão e organização de finanças pessoais. Você ajuda as pessoas a organizarem melhor as suas finanças.",
          },
          {
            role: "user",
            content,
          },
        ],
      });
    });

    console.log("Resposta do OpenAI:", completion); // Verifique a resposta do OpenAI
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Erro ao gerar o relatório de IA:", error);
    return DUMMY_REPORT; // Retorna o relatório dummy em caso de erro
  }
};
