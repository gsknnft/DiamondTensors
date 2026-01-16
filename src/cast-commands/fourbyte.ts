import { z } from "zod";
import axios from "axios";

export class FourByteService {
    private static baseUrl = "https://www.4byte.directory/api/v1";

        static async fourByte({ selector }: {selector: any}) {
            try {
                const cleanSelector = selector.startsWith('0x') ? selector.slice(2) : selector;
                if (!/^[0-9a-fA-F]{8}$/.test(cleanSelector)) {
                    return {
                        content: [{
                                type: "text",
                                text: "Error: Selector must be an 8-character hexadecimal string"
                            }],
                        isError: true
                    };
                }
                const signatures = await FourByteService.getFunctionSignatures(cleanSelector);
                if (signatures.length === 0) {
                    return {
                        content: [{
                                type: "text",
                                text: `No function signatures found for selector 0x${cleanSelector}`
                            }]
                    };
                }
                const signaturesText = signatures.map((sig: any, index: number) => `${index + 1}. ${sig.text_signature}`).join('\n');
                return {
                    content: [{
                            type: "text",
                            text: `Function signatures for selector 0x${cleanSelector}:\n\n${signaturesText}`
                        }]
                };
            }
            catch (error) {
                return {
                    content: [{
                            type: "text",
                            text: `Error getting function signatures: ${error instanceof Error ? error.message : String(error)}`
                        }],
                    isError: true
                };
            }
        }

        static async fourByteDecode({ calldata }: {calldata: any}) {
            try {
                const cleanCalldata = calldata.startsWith('0x') ? calldata.slice(2) : calldata;
                if (cleanCalldata.length < 8) {
                    return {
                        content: [{
                                type: "text",
                                text: "Error: Calldata must have at least 4 bytes for function selector"
                            }],
                        isError: true
                    };
                }
                const selector = cleanCalldata.slice(0, 8);
                const signatures = await FourByteService.getFunctionSignatures(selector);
                if (signatures.length === 0) {
                    return {
                        content: [{
                                type: "text",
                                text: `No function signatures found for selector 0x${selector}, cannot decode`
                            }]
                    };
                }
                const decodingInfo = signatures.map((sig: any, index: number) => {
                    return `${index + 1}. Possible function signature: ${sig.text_signature}
   Selector: 0x${selector}
   Parameter data: 0x${cleanCalldata.slice(8)}`;
                }).join('\n\n');
                return {
                    content: [{
                            type: "text",
                            text: `Calldata decode result:\n\noriginal data: 0x${cleanCalldata}\n\n${decodingInfo}\n\nNote: Need specific ABI definition to fully decode parameter values.`
                        }]
                };
            }
            catch (error) {
                return {
                    content: [{
                            type: "text",
                            text: `error: ${error instanceof Error ? error.message : String(error)}`
                        }],
                    isError: true
                };
            }
        }
    
    static async getFunctionSignatures(selector: any) {
        const {data} = await axios.get(`${FourByteService.baseUrl}/signatures/?hex_signature=0x${selector}&format=json`);
        if (!data.ok) {
            throw new Error(`4byte API request failed: ${data.status} ${data.statusText}`);
        }
        return data.results || [];
    }
}
//# sourceMappingURL=fourbyte.js.map