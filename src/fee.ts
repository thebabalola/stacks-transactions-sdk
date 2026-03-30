import { API_URLS } from "richiey1-stacks-helpers-types";

export async function estimateFee(
  txType: "token_transfer" | "smart_contract" | "contract_call",
  networkUrl: string = API_URLS.mainnet
): Promise<{ low: number; medium: number; high: number }> {
  try {
    const resp = await fetch(`${networkUrl}/v2/fees/transfer`);
    const data = await resp.json();
    const base = typeof data === "number" ? data : 2500;
    return {
      low: Math.max(base, 2500),
      medium: Math.max(Math.floor(base * 1.5), 3750),
      high: Math.max(base * 2, 5000),
    };
  } catch {
    return { low: 2500, medium: 3750, high: 5000 };
  }
}
