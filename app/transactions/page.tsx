import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import Navbar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ScrollArea } from "../_components/ui/scroll-area";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";

const TransactionsPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
  });
  const userCanAddTransaction = await canUserAddTransaction();

  return (
    <>
      <Navbar />
      <div className="space-y-6 p-4 sm:p-6">
        {/* TÍTULO E BOTÃO */}
        <div className="flex w-full flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-xl font-bold sm:text-2xl">Transações</h1>
          <AddTransactionButton userCanAddTransaction={userCanAddTransaction} />
        </div>

        {/* Scroll Area com rolagem vertical e horizontal */}
        <ScrollArea>
          <div className="w-full overflow-x-auto">
            {/* A tabela deve ser responsiva */}
            <div className="min-w-full sm:min-w-[800px]">
              <DataTable columns={transactionColumns} data={transactions} />
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default TransactionsPage;
