import {
  WalletNotConnectedError,
  WalletAdapterProps,
} from '@solana/wallet-adapter-base';
import {
  PublicKey,
  Connection,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';

export const getBalance = async (
  publicKey: PublicKey | null,
  connection: Connection
) => {
  if (!publicKey) return 0;

  let balance = 0;
  balance = await connection.getBalance(publicKey, 'confirmed');
  balance = balance / LAMPORTS_PER_SOL;

  return balance;
};

export const createTX = async (
  publicKey: PublicKey | null,
  connection: Connection,
  sendTransaction: WalletAdapterProps['sendTransaction'],
  amount: string,
  address: string
) => {
  if (!publicKey) throw new WalletNotConnectedError();

  const parsedAmount = parseFloat(amount);

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: new PublicKey(address),
      lamports: parsedAmount * LAMPORTS_PER_SOL,
    })
  );

  const {
    context: { slot: minContextSlot },
    value: { blockhash, lastValidBlockHeight },
  } = await connection.getLatestBlockhashAndContext();

  const signature = await sendTransaction(transaction, connection, {
    minContextSlot,
  });

  await connection.confirmTransaction({
    blockhash,
    lastValidBlockHeight,
    signature,
  });

  const tx = await connection.getTransaction(signature, {
    commitment: 'confirmed',
  });

  return {
    amount: parsedAmount,
    fee: tx?.meta?.fee,
    block: tx?.blockTime,
    signature,
  };
};

export const matchTXError = (
  e: Error,
  endTransactionFailing: (errorMessage: string) => void
) => {
  switch (e?.name) {
    case 'WalletSendTransactionError': {
      const split = e?.message?.split?.(':');
      return endTransactionFailing(
        `Failed to send transaction: ${split[split.length - 1]}`
      );
    }

    case 'WalletNotConnectedError':
      return endTransactionFailing(
        'Failed to send transaction: Wallet is disconnected.'
      );

    default:
      return endTransactionFailing(`Failed to send transaction: ${e?.message}`);
  }
};
