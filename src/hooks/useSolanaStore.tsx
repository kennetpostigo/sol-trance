'use client';

import { useEffect } from 'react';
import { create } from 'zustand';
import { PublicKey, Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { getBalance } from './utils';
import { Transaction } from './types';

export interface SolanaStore {
  balance: number;
  lastTransaction: Transaction | undefined;
  loading: boolean;
  error?: string;
  methods: {
    startTransaction: () => void;
    endTransactionFailing: (e: string) => void;

    setBalance: (publicKey: PublicKey | null, connection: Connection) => void;
    setLastTransaction: (
      publicKey: PublicKey | null,
      connection: Connection,
      tx: Transaction
    ) => void;
    clearLastTransaction: () => void;
  };
}

export const useSolanaStore = create<SolanaStore>((set, get) => ({
  balance: 0,
  lastTransaction: undefined,
  loading: false,
  error: undefined,
  methods: {
    startTransaction: () =>
      set((state) => ({ ...state, loading: true, error: undefined })),

    endTransactionFailing: (e) =>
      set((state) => ({ ...state, loading: false, error: e })),

    setBalance: async (publicKey, connection) => {
      if (!publicKey) return;
      let balance = 0;
      try {
        balance = await getBalance(publicKey, connection);
      } catch (e) {
        console.error(`error getting balance: `, e);
      }
      set((state) => {
        return { ...state, balance };
      });
    },

    setLastTransaction: async (publicKey, connection, tx) => {
      if (!publicKey) return;
      let balance = 0;
      try {
        balance = await getBalance(publicKey, connection);
      } catch (error) {
        console.error(error);
      }

      set((state) => {
        return {
          ...state,
          balance,
          lastTransaction: tx,
          loading: false,
          error: undefined,
        };
      });
    },

    clearLastTransaction: () =>
      set((state) => ({ ...state, lastTransaction: undefined })),
  },
}));

export const useSolanaBalance = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const balance = useSolanaStore((state) => state.balance);
  const setBalance = useSolanaStore((state) => state.methods.setBalance);

  useEffect(() => {
    if (publicKey && connection) {
      setBalance(publicKey, connection);
    }
  }, [setBalance, connection, publicKey]);

  return { balance, setBalance };
};

export const useSolanaTransaction = () => {
  const loading = useSolanaStore((state) => state.loading);
  const error = useSolanaStore((state) => state.error);
  const lastTransaction = useSolanaStore((state) => state.lastTransaction);

  const startTransaction = useSolanaStore(
    (state) => state.methods.startTransaction
  );
  const endTransactionFailing = useSolanaStore(
    (state) => state.methods.endTransactionFailing
  );
  const setLastTransaction = useSolanaStore(
    (state) => state.methods.setLastTransaction
  );
  const clearLastTransaction = useSolanaStore(
    (state) => state.methods.clearLastTransaction
  );

  return {
    loading,
    error,
    lastTransaction,
    methods: {
      startTransaction,
      endTransactionFailing,
      setLastTransaction,
      clearLastTransaction,
    },
  };
};
