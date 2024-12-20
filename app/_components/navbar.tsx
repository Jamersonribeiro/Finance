"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="flex items-center justify-between border-b border-solid px-4 py-4">
      {/* ESQUERDA - Logotipo e Links */}
      <div className="flex items-center gap-6">
        <Image src="/logo.png" width={173} height={39} alt="Finance AI" />
        <div className="flex items-center gap-4">
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
      <div className="ml-auto">
        <UserButton showName />
      </div>
    </nav>
  );
};

export default Navbar;
