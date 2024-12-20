import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import { isMatch } from "date-fns";
import TransactionsPieChart from "./_components/transactions-pie-chart";
import { getDashboard } from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import AiReportButton from "./_components/ai-report-button";
import SummaryCards from "./_components/summary-cards";
import DashboardFilters from "./_components/time-select";

// Interface para tipagem das propriedades do componente
interface HomeProps {
  searchParams: Promise<{
    month: string;
    year?: string;
  }>;
}

// Função principal do componente
const Home = async ({ searchParams }: HomeProps) => {
  const resolvedSearchParams = await searchParams;

  const { month, year } = resolvedSearchParams;

  // Verifica se o usuário está autenticado
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  // Valida o formato do mês e do ano
  const monthIsInvalid = !month || !isMatch(month, "MM");
  const yearIsInvalid = !year || !isMatch(year, "yyyy");

  if (monthIsInvalid || yearIsInvalid) {
    // Redireciona para o mês e ano atuais, caso sejam inválidos
    redirect(
      `?month=${String(new Date().getMonth() + 1).padStart(2, "0")}&year=${new Date().getFullYear()}`,
    );
  }

  // Obtém dados do dashboard e informações adicionais
  const dashboard = await getDashboard(month, year);
  const userCanAddTransaction = await canUserAddTransaction();
  const user = await clerkClient().users.getUser(userId);

  return (
    <>
      <div className="flex h-full w-full flex-col overflow-x-auto">
        <Navbar />
        <div className="flex flex-col space-y-6 p-6">
          <div className="mb-6 flex flex-col justify-between md:flex-row">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="flex items-center gap-3">
              <AiReportButton
                month={month}
                year={year}
                hasPremiumPlan={
                  user.publicMetadata.subscriptionPlan === "premium"
                }
              />
              <DashboardFilters />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            {/* SummaryCards em layout vertical para mobile */}
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-6">
              <SummaryCards
                month={month}
                {...dashboard}
                userCanAddTransaction={userCanAddTransaction}
              />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <TransactionsPieChart {...dashboard} />
              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
            <LastTransactions lastTransactions={dashboard.lastTransactions} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
