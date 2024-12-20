"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="flex flex-wrap items-center justify-between border-b border-solid px-4 py-4">
      {/* ESQUERDA - Logotipo e Links */}
      <div className="flex w-full items-center gap-6 sm:w-auto">
        <Image src="/logo.png" width={173} height={39} alt="Finance AI" />
        <div className="flex w-full items-center gap-4 sm:w-auto">
          <Link
            href="/"
            className={
              pathname === "/"
                ? "font-bold text-primary"
                : "text-muted-foreground"
            }
          >
            Dashboard
          </Link>
          <Link
            href="/transactions"
            className={
              pathname === "/transactions"
                ? "font-bold text-primary"
                : "text-muted-foreground"
            }
          >
            Transações
          </Link>
          <Link
            href="/subscription"
            className={
              pathname === "/subscription"
                ? "font-bold text-primary"
                : "text-muted-foreground"
            }
          >
            Assinatura
          </Link>
        </div>
      </div>

      {/* DIREITA - UserButton */}
      <div className="ml-auto mt-4 w-full text-right sm:ml-0 sm:mt-0 sm:w-auto">
        <UserButton showName />
      </div>
    </nav>
  );
};

export default Navbar;
