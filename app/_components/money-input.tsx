import React, { forwardRef } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { Input } from "@/app/_components/ui/input"; // Confirme se o caminho está correto

// Certifique-se de que InputProps está definido, caso contrário, remova se não for necessário.
export const MoneyInput = forwardRef<HTMLInputElement, NumericFormatProps>(
  (props, ref) => {
    return (
      <NumericFormat
        {...props}
        thousandSeparator="."
        decimalSeparator=","
        prefix="R$ "
        allowNegative={false}
        customInput={Input}
        getInputRef={ref} // Certifique-se de que `getInputRef` é compatível
      />
    );
  },
);

MoneyInput.displayName = "MoneyInput";
