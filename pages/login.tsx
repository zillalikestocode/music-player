import type { NextPage } from "next";
import { getProviders, signIn } from "next-auth/react";

interface Props {
  providers: object;
}

const Login = ({ providers }: Props) => {
  return (
    <div className="min-h-screen text-white w-full bg-black text-white flex flex-col items-center justify-center">
      <div className="flex items-center gap-2">
        <p className="text-xl md:text-2xl lg:text-3xl">
          Music player powered by
        </p>
        <img src="https://links.papareact.com/9xl" className="w-16 h-16" />
      </div>
      {Object.values(providers).map((provider) => {
        return (
          <button
            key={provider.id}
            className="p-3 bg-[#1db954] rounded-lg "
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: "/",
              })
            }
          >
            Log in with {provider.name}
          </button>
        );
      })}
    </div>
  );
};
export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
