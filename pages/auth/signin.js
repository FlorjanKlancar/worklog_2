import React from "react";
import {getProviders, signIn as SignInFunc} from "next-auth/react";

function signin({providers}) {
  return (
    <div className="h-screen">
      {Object.values(providers).map((provider) => (
        <div key={provider.name} className="pt-80">
          <div>
            <button
              onClick={() => SignInFunc(provider.id, {callbackUrl: "/"})}
              className="bg-blue-500 rounded-lg px-4 py-3 w-full text-white font-semibold"
            >
              Sign in with {provider.name}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default signin;
