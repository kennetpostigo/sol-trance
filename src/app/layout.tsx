import { Web3Provider } from '@/web3/Web3Provider';
import { Search } from '@/components/Search';

import './globals.css';
import '@solana/wallet-adapter-react-ui/styles.css';

export const metadata = {
  title: 'Sol trance',
  description:
    'Example application for sending sol to another user and viewing transactions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Web3Provider>
          <Search />
          {children}
          </Web3Provider>
      </body>
    </html>
  );
}
