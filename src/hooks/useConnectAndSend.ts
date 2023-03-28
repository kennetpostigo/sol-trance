'use client';

import { useCallback } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { useSolanaBalance, useSolanaTransaction } from './useSolanaStore';
import { useSendForm } from './useSendForm';
import { createTX, matchTXError } from './utils';

export const useConnectAndSend = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const { address, amount, methods: sendFormMethods } = useSendForm();
  const { balance } = useSolanaBalance();
  const {
    loading,
    error,
    lastTransaction,
    methods: transactionMethods,
  } = useSolanaTransaction();

  const createTransaction = useCallback(
    async (amount: string, address: string) => {
      try {
        transactionMethods.startTransaction();
        const tx = await createTX(
          publicKey,
          connection,
          sendTransaction,
          amount,
          address
        );
        await transactionMethods.setLastTransaction(publicKey, connection, tx);
      } catch (err) {
        matchTXError(err as any, transactionMethods.endTransactionFailing);
        console.error(err);
      }
    },
    [publicKey, sendTransaction, connection, transactionMethods]
  );

  return {
    publicKey,
    amount,
    address,
    loading,
    error,
    balance,
    lastTransaction,
    methods: {
      createTransaction,
      onAddressChange: sendFormMethods.onAddressChange,
      onAmountChange: sendFormMethods.onAmountChange,
      clearLastTransaction: transactionMethods.clearLastTransaction,
    },
  };
};
