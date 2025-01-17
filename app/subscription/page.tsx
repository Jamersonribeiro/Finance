import { auth, clerkClient } from "@clerk/nextjs/server";
import Navbar from "../_components/navbar";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "../_components/ui/card";
import { CheckIcon } from "lucide-react";
import AcquirePlanButton from "./_components/acquire-plan-button";
import { Badge } from "../_components/ui/badge";
import { getCurrentMonthTransactions } from "../_data/get-current-month-transactions";

const SubscriptionPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  const user = await clerkClient().users.getUser(userId);
  const currentMonthTransactions = await getCurrentMonthTransactions();
  const hasPremiumPlan = user.publicMetadata.subscriptionPlan == "premium";
  return (
    <>
      <Navbar />
      <div className="min-h-screen space-y-6 overflow-y-auto p-6">
        <h1 className="text-2xl font-bold">Assinatura</h1>

        {/* Container com rolagem apenas no celular, empilhando os cards */}
        <div className="flex flex-col overflow-x-hidden sm:flex-row sm:gap-6">
          <Card className="mb-6 w-full sm:w-[450px]">
            <CardHeader className="border-b border-solid py-8">
              <h2 className="text-center text-2xl font-semibold">
                Plano Básico
              </h2>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">R$</span>
                <span className="text-6xl font-semibold">0</span>
                <div className="text-2xl text-muted-foreground">/mês</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>
                  Apenas 8 transações por mês ({currentMonthTransactions}/8)
                </p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Dashboards Categorizados</p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6 w-full sm:w-[450px]">
            <CardHeader className="relative border-b border-solid py-8">
              {hasPremiumPlan && (
                <Badge className="absolute left-4 top-12 bg-primary/10 text-primary">
                  Ativo
                </Badge>
              )}
              <h2 className="text-center text-2xl font-semibold">
                Plano Premium
              </h2>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">R$</span>
                <span className="text-6xl font-semibold">19</span>
                <div className="text-2xl text-muted-foreground">/mês</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Transações ilimitadas</p>
              </div>

              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Relatórios de IA</p>
              </div>

              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Dashboards Categorizados</p>
              </div>

              <AcquirePlanButton />
            </CardContent>
          </Card>

          <Card className="mb-6 w-full sm:w-[450px]">
            <CardHeader className="border-b border-solid py-8">
              <h2 className="text-center text-2xl font-semibold">Plano Pro</h2>

              <div className="flex items-center justify-center gap-3 text-4xl font-bold">
                EM BREVE
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Transações Ilimitadas</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Relatórios de IA</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Dashboards Categorizados</p>
              </div>

              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                Receber Relatórios detalhados por e-mail
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Análise de Fluxo de Caixa</p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6 w-full sm:w-[450px]">
            <CardHeader className="border-b border-solid py-8">
              <h2 className="text-center text-2xl font-semibold">
                Plano Pro Plus
              </h2>
              <div className="flex items-center justify-center gap-3 text-4xl font-bold">
                EM BREVE
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Transações Ilimitadas</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Relatórios de IA</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Dashboards Categorizados</p>
              </div>

              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                Receber Relatórios detalhados por e-mail
              </div>

              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Análise de Fluxo de Caixa</p>
              </div>

              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                Previsão de despesas
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                Notificação de vencimentos
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                Exportar dados
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPage;
