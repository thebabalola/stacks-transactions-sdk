import {
  makeSTXTokenTransfer,
  broadcastTransaction,
} from "@stacks/transactions";
import type { BatchResult } from "richiey1-stacks-helpers-types";
import { MAINNET } from "richiey1-stacks-helpers-types";

export interface TransferOptions {
  recipient: string;
  amount: bigint;
  senderKey: string;
  network?: any;
  nonce?: bigint;
  fee?: bigint;
  memo?: string;
}

export async function transferSTX(options: TransferOptions): Promise<BatchResult> {
  try {
    const tx = await makeSTXTokenTransfer({
      recipient: options.recipient,
      amount: options.amount,
      senderKey: options.senderKey,
      network: options.network ?? MAINNET,
      nonce: options.nonce,
      fee: options.fee,
    });

    const result = await broadcastTransaction({
      transaction: tx,
      network: options.network ?? MAINNET,
    });

    const txid = typeof result === "string" ? result : (result as any)?.txid;
    if (txid && !(result as any).error) {
      return { txid, success: true };
    }
    return { txid: "", success: false, error: JSON.stringify(result) };
  } catch (err: any) {
    return { txid: "", success: false, error: err.message };
  }
}
