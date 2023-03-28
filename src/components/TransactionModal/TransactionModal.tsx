'use client';

import React from 'react';
import cx from 'classnames';
import * as Dialog from '@radix-ui/react-dialog';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Inter } from 'next/font/google';
import { Transaction } from '@/hooks/types';

import styles from './TransactionModal.module.css';

const inter = Inter({ subsets: ['latin'] });

export interface TransactionDialogProps {
  lastTransaction?: Transaction;
  clearLastTransaction: () => void;
}

export const TransactionDialog: React.FC<TransactionDialogProps> = ({
  lastTransaction,
  clearLastTransaction,
}) => {
  return (
    <Dialog.Root open={!!lastTransaction}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.dialogOverlay} />
        <Dialog.Content
          className={styles.dialogContent}
          onInteractOutside={clearLastTransaction}
        >
          <div className={styles.dialogHeader}>
            <Dialog.Title className={cx(inter.className, styles.dialogTitle)}>
              Successful Transaction
            </Dialog.Title>
            <button
              className={styles.iconButton}
              onClick={clearLastTransaction}
              aria-label="Close"
            >
              x
            </button>
          </div>

          <Dialog.Description
            className={cx(inter.className, styles.dialogDescription)}
          >
            <div className={styles.receipt}>
              <div className={styles.entry}>
                <div className={styles.key}>
                  <span>Amount</span>
                </div>
                <div className={styles.value}>
                  <span>{lastTransaction?.amount} SOL</span>
                </div>
              </div>

              <div className={styles.entry}>
                <div className={styles.key}>
                  <span>Fee</span>
                </div>
                <div className={styles.value}>
                  <span>
                    {(lastTransaction?.fee || 0) / LAMPORTS_PER_SOL} SOL
                  </span>
                </div>
              </div>

              <div className={styles.entry}>
                <div className={styles.key}>
                  <span>Block</span>
                </div>
                <div className={styles.value}>
                  <a
                    href={`https://solscan.io/block/${lastTransaction?.block || 0}?cluster=devnet`}
                    target="_blank"
                  >
                    {lastTransaction?.block}
                  </a>
                </div>
              </div>

              <div className={styles.entry}>
                <div className={styles.key}>
                  <span>Signature</span>
                </div>
                <div className={styles.value}>
                  <span>{lastTransaction?.signature}</span>
                </div>
              </div>
            </div>
          </Dialog.Description>

          <div className={styles.dialogFooter}>
            <Dialog.Close asChild>
              <button
                className={cx(styles.button, styles.green)}
                onClick={clearLastTransaction}
              >
                Ok
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
