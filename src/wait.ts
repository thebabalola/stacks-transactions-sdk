import { API_URLS } from "richiey1-stacks-helpers-types";

export async function waitForConfirmation(
  txid: string,
  networkUrl: string = API_URLS.mainnet,
  timeoutMs: number = 300000,
  pollMs: number = 5000
): Promise<{ success: boolean; status: string }> {
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    try {
      const resp = await fetch(`${networkUrl}/extended/v1/tx/${txid}`);
      if (resp.ok) {
        const data = await resp.json();
        if (data.tx_status === "success") {
          return { success: true, status: "success" };
        }
        if (data.tx_status === "failed" || data.tx_status === "rejected") {
          return { success: false, status: data.tx_status };
        }
      }
    } catch {}

    await new Promise((r) => setTimeout(r, pollMs));
  }

  return { success: false, status: "timeout" };
}
