"use client";
import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import UpsertTransactionDialog from "./upsert-transaction-dialog";

const AddTransactionButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        className="rounded-full font-bold"
        onClick={() => setDialogIsOpen(true)}
      >
        <ArrowDownUpIcon className="ml-2" />
        Adicionar Transação
      </Button>

      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
      />
    </>
  );
};

export default AddTransactionButton;
