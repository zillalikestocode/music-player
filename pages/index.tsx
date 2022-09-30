import type { NextPage } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Center from "../components/Center";
import Sidebar from "../components/Sidebar";
import Play from "../components/Play";

const Home: NextPage = () => {
  return (
    <div className="h-screen overflow-hidden bg-black ">
      <Head>
        <title>Z-muzic</title>
        <link rel="icon" href="/favicon.ico" />
        <base href="/" />
      </Head>
      <main className="flex w-full">
        <Sidebar />
        <Center />
      </main>
      <div className="sticky bottom-0 ">
        <Play />
      </div>
    </div>
  );
};

export default Home;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
