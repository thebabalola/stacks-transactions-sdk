# thebabalola-stacks-helpers-transactions

STX transfers, fee estimation, and transaction confirmation for Stacks L2.

## Install

```bash
npm install thebabalola-stacks-helpers-transactions
```

## Usage

```typescript
import { transferSTX, estimateFee, waitForConfirmation } from "thebabalola-stacks-helpers-transactions";

// Transfer STX
const result = await transferSTX({
  recipient: "SP...",
  amount: 1000000n,
  senderKey: "your-private-key",
});

// Estimate fees
const fees = await estimateFee("token_transfer");
// Returns: { low: 2500, medium: 3750, high: 5000 }

// Wait for transaction confirmation
const confirmation = await waitForConfirmation("0x...");
// Returns: { success: true, status: "success" }
```

## API

### `transferSTX(options)`
Send STX to a recipient. Options:
- `recipient` — Address to send to
- `amount` — Amount in uSTX (bigint)
- `senderKey` — Sender's private key
- `network?` — Stacks network (default: mainnet)
- `nonce?` — Transaction nonce
- `fee?` — Transaction fee in uSTX

### `estimateFee(txType, networkUrl?)`
Estimate fees for a transaction type. Returns `{ low, medium, high }`.

### `waitForConfirmation(txid, networkUrl?, timeoutMs?, pollMs?)`
Poll for transaction confirmation. Returns `{ success, status }`.

## License

MIT

## Author

thebabalola
