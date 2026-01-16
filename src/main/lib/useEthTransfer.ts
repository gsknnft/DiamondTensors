import { getContract, Address, parseEther, erc20Abi, parseUnits } from "viem"
import { useWalletClient } from "wagmi"
import handleTxError from "./library/handleTxError"
import { parseArgs } from "@args";

export enum TxSTATUS { INITIALIZING="INITIALIZING", SENDING="SENDING" }
const {dryrun} = parseArgs(process.argv)

const router: Address = (process.env.ROUTER_ADDRESS ?? '0x') as Address;

export const useEthTransfer = async () => {
  const { data: signer } = useWalletClient();
  if (!signer) return async () => ({ err: "missing signer" });

  type Result = { err?: string; receipt?: any };

  const transferFromAccount = async (
    token: Address,
    to: Address,
    value: string, // UI units string, e.g. "1.5"
    update: (s: TxSTATUS) => void,
  ): Promise<Result> => {
    try {
      update(TxSTATUS.INITIALIZING);
      const erc20 = getContract({ address: token, abi: erc20Abi, client: signer });
      const decimals = await erc20.read.decimals();
      const amount = parseUnits(value, decimals);
      await erc20.write.approve([router, amount], { account: signer.account! });

      update(TxSTATUS.SENDING);
      // direct transfer (no approve needed)
      const hash = await erc20.write.transfer([to, amount], { account: signer.account! });
      return { receipt: hash };
    } catch (err: any) {
      handleTxError(err);
      return { err: err?.message ?? String(err) };
    }
  };

  return transferFromAccount;
};

useEthTransfer();