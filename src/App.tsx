import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import React, { FC, ReactNode, useMemo } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ResponsiveAppBar from './components/ResponsiveAppBar'
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import Welcome from './routes/welcome'
import Feed from './routes/feed'
import NotFound from './routes/not-found'
import SignUp from './routes/signup'

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css')

function App() {
  return (
    <Context>
      <BrowserRouter>
        <ResponsiveAppBar />
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
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
