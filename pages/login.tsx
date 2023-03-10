import { GetServerSideProps } from 'next';
import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from 'next-auth/react';
import Image from 'next/image';

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders()

  return {
    props: {
      providers
    }
  }
}

type Props = {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null
};

function Login({ providers }: Props) {
  const handleLogin = (provider: ClientSafeProvider) => {
    console.log({ provider })
    signIn(provider.id, { callbackUrl: '/' })
  }
  return (
    <div className='min-h-screen flex flex-col justify-center items-center space-y-8 bg-black'>
      <div className='text-center'>
        <Image
          src="/Spotify_Logo_RGB_Green.png"
          alt="spotify logo"
          width={280}
          height={84}
          className="mx-auto"
        />
        <span className='text-white'>Clone</span>
      </div>
      {providers && Object.values(providers).map(provider => (
        <div key={provider.name} className="text-center mt-6">
          <button
            onClick={() => handleLogin(provider) as unknown as React.MouseEventHandler<HTMLButtonElement>}
            className='bg-[#18D860] rounded-lg text-black p-5
          active:bg-black active:text-white'
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  )
}

export default Login;