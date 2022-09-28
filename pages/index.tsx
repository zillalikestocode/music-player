import type { NextPage } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Center from "../components/Center";
import Sidebar from "../components/Sidebar";

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
    </div>
  );
};

export default Home;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
