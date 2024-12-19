import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Head from "next/head"; // Importe o Head

const LoginPage = async () => {
  const { userId } = await auth();
  if (userId) {
    redirect("/");
  }

  return (
    <>
      <Head>
        <title>Login | Finance AI</title> {/* Define o título da página */}
        <meta
          name="description"
          content="Faça login ou crie sua conta na Finance AI, plataforma de gestão financeira com IA."
        />{" "}
        {/* Descrição da página */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />{" "}
        {/* Configuração do viewport */}
      </Head>

      <div className="grid min-h-screen grid-cols-1 overflow-auto md:grid-cols-2">
        {/* ESQUERDA */}
        <div className="mx-auto flex max-w-full flex-col justify-center p-6 md:max-w-[550px] md:p-10">
          <Image
            src="/logo.png"
            width={173}
            height={39}
            alt="Finance AI"
            className="mb-6"
          />
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">Bem vindo</h1>
          <p className="mb-6 text-sm text-muted-foreground md:mb-8 md:text-base">
            A Finance AI é uma plataforma de gestão financeira que utiliza IA
            para monitorar suas movimentações e oferecer insights
            personalizados, facilitando o controle do seu orçamento.
          </p>
          <SignInButton>
            <Button variant="outline">Fazer login ou criar conta</Button>
          </SignInButton>
        </div>

        {/* DIREITA */}
        <div className="relative h-full w-full overflow-auto">
          <div className="relative mx-auto h-[600px] w-[800px]">
            <Image
              src="/login.png"
              alt="Faça Login"
              layout="responsive"
              width={800}
              height={600}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
