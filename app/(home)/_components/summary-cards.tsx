import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summury-card";

interface SummaryCards {
  month: string;
  balance: number;
  depositTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
  userCanAddTransaction?: boolean;
}

const SummaryCards = async ({
  balance,
  depositTotal,
  expensesTotal,
  investmentsTotal,
  userCanAddTransaction,
}: SummaryCards) => {
  return (
    <div className="space-y-6">
      {/* PRIMEIRO CARD - SALDO MENSAL */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-1">
        <SummaryCard
          icon={<WalletIcon size={16} />}
          title="Saldo Mensal"
          amount={balance}
          size="large"
          userCanAddTransaction={userCanAddTransaction}
        />
      </div>

      {/* OUTROS CARDS - INVESTIDO, RECEITA, DESPESAS */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <SummaryCard
          icon={<PiggyBankIcon size={16} />}
          title="Investido"
          amount={investmentsTotal}
        />
        <SummaryCard
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title="Receita"
          amount={depositTotal}
        />
        <SummaryCard
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title="Despesas"
          amount={expensesTotal}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
