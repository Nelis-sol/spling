import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import React, { FC, ReactNode, useMemo } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import ResponsiveAppBar from './components/ResponsiveAppBar'
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets'

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css')

function App() {
  return (
    <Context>
      <div>
        <ResponsiveAppBar />
        <Outlet />
      </div>
    </Context>
  )
}

const Context: FC<{ children: ReactNode }> = ({ children }) => {
  const network = 'https://ssc-dao.genesysgo.net/'
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new SlopeWalletAdapter(),
      new TorusWalletAdapter(),
    ],
    [network],
  )

  return (
    <ConnectionProvider endpoint={network} config={{ commitment: 'max' }}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default App
