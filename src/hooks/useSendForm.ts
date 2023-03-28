'use client';

import { create } from 'zustand';

export interface SendForm {
  amount?: string;
  address?: string;
  methods: {
    onAmountChange: (amount: string) => void;
    onAddressChange: (address: string) => void;
  };
}

export const useSendForm = create<SendForm>((set, _get) => ({
  amount: '',
  address: '',
  methods: {
    onAmountChange: (amount) => set((state) => ({ ...state, amount })),
    onAddressChange: (address) => set((state) => ({ ...state, address })),
  },
}));
