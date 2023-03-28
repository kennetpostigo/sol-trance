export interface Transaction {
  amount: number;
  fee: number | undefined;
  block: number | null | undefined;
  signature: string;
}
