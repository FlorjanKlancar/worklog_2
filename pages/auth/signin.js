import { getProviders, signIn } from "next-auth/react";

export default function SignIn({ providers }) {
  return (
    <div className="h-screen">
      <div className="pt-80">
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              className="bg-blue-500 rounded-lg px-4 py-3 w-full text-white font-semibold"
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
