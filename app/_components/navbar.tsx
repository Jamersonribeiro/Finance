"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="flex flex-wrap items-center justify-between border-b border-solid px-8 py-4">
      {/* ESQUERDA */}
      <div className="flex min-w-0 items-center gap-10">
        <Image src="/logo.png" width={173} height={39} alt="Finance AI" />
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
      {/* DIREITA - UserButton */}
      <div className="ml-auto mt-2 sm:mt-0">
        <UserButton showName />
      </div>
    </nav>
  );
};

export default Navbar;
