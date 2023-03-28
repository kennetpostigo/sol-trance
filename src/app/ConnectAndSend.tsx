'use client';

import React from 'react';
import cx from 'classnames';
import { Inter } from 'next/font/google';
import ClipLoader from 'react-spinners/ClipLoader';

import { useConnectAndSend } from '@/hooks/useConnectAndSend';
import {
  WalletMultiButton,
  WalletDisconnectButton,
} from '@/components/WalletButtons';
import { TransactionDialog } from '@/components/TransactionModal';
import { Card } from '@/components/Card';

import styles from './ConnectAndSend.module.css';

const inter = Inter({ subsets: ['latin'] });

export const ConnectAndSend = () => {
  const {
    publicKey,
    error,
    loading,
    lastTransaction,
    amount,
    address,
    methods,
    balance,
  } = useConnectAndSend();

  return (
    <>
      <TransactionDialog
        lastTransaction={lastTransaction}
        clearLastTransaction={methods.clearLastTransaction}
      />
      <Card className={styles.card} size="md">
        <div className={styles.cardHeader}>
          <h1 className={inter.className}>Sol Trance</h1>
          {!publicKey ? <WalletMultiButton /> : <WalletDisconnectButton />}
        </div>

        {publicKey ? (
          <div className={styles.walletInfo}>
            <pre className={cx(styles.info)}>
              Address: {publicKey?.toBase58()}
            </pre>
            <pre className={cx(styles.infoNoScroll)}>Balance: {balance}</pre>
          </div>
        ) : null}

        {error ? (
          <div className={styles.error}>
            <span className={inter.className}>{error}</span>{' '}
          </div>
        ) : null}

        <input
          className={cx(inter.className, styles.input)}
          type="number"
          placeholder="Amount"
          min={0}
          value={amount}
          onChange={(e) => methods.onAmountChange(e.target.value)}
        />

        <div className={styles.seperator} />

        <input
          className={cx(inter.className, styles.input)}
          type="text"
          placeholder="SOL Address"
          value={address}
          onChange={(e) => methods.onAddressChange(e.target.value)}
        />

        <button
          disabled={!publicKey || !amount || !address || loading}
          className={styles.button}
          onClick={() => methods.createTransaction(amount || '', address || '')}
        >
          {loading ? (
            <ClipLoader
              className={styles.loading}
              size={14}
              color={loading ? 'rgba(255, 255, 255, 0.3)' : '#fff'}
              speedMultiplier={0.7}
            />
          ) : null}
          <span>Send</span>
        </button>
      </Card>
    </>
  );
};
