"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="flex flex-col border-b border-solid px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      {/* ESQUERDA - Logotipo e botão de menu */}
      <div className="flex w-full items-center justify-between sm:w-auto">
        <Image src="/logo.png" width={173} height={39} alt="Finance AI" />
        <button className="text-primary sm:hidden" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? "Fechar" : "Menu"}
        </button>
      </div>

      {/* LINKS - Visíveis como lista em mobile e inline em desktop */}
      <div
        className={`${
          isMobileMenuOpen ? "mt-4 flex flex-col gap-2" : "hidden"
        } w-full sm:flex sm:w-auto sm:flex-row sm:gap-6`}
      >
        <Link
          href="/"
          className={`${
            pathname === "/"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          } block sm:inline`}
        >
          Dashboard
        </Link>
        <Link
          href="/transactions"
          className={`${
            pathname === "/transactions"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          } block sm:inline`}
        >
          Transações
        </Link>
        <Link
          href="/subscription"
          className={`${
            pathname === "/subscription"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          } block sm:inline`}
        >
          Assinatura
        </Link>
      </div>

      {/* DIREITA - UserButton */}
      <div className="ml-auto mt-4 w-full text-right sm:ml-0 sm:mt-0 sm:w-auto">
        <UserButton showName />
      </div>
    </nav>
  );
};

export default Navbar;
