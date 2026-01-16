import { ethers } from "ethers";
import { keccak256 } from "viem";

export class UtilsService {
        static sig({ functionName }: {functionName: any}) {
            const functionSelector = keccak256(ethers.toUtf8Bytes(functionName)).slice(0, 10);
            return {
                content: [{ type: "text", text: `function selector: ${functionSelector}` }]
            };
        }
        // register tools to get event signature
        static async eventSig({ eventName }: {eventName: string}) {
            const eventSignature = keccak256(ethers.toUtf8Bytes(eventName)).slice(0, 10);
            return {
                content: [{ type: "text", text: `event signature: ${eventSignature}` }]
            };
        };

        // tool to calculate keccak256 hash
        static async createKeccak256({ data }: {data: any}) {
            const hash = keccak256(ethers.toUtf8Bytes(data));
            return {
                content: [{ type: "text", text: `keccak256 hash: ${hash}` }]
            };
        }
    }

