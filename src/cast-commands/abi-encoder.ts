import { z } from "zod";
import ethers from "ethers";
import { isAddress } from "viem";


const abiCoder = new ethers.AbiCoder();

export class AbiEncoder {
    static async abiEncode({ types, values }: {types: any, values: any}) {
            try {
                if (types.length !== values.length) {
                    return {
                        content: [{
                                type: "text",
                                text: "error: parameter types and values length mismatch"
                            }],
                        isError: true
                    };
                }
                const processedValues = this.processValues(types, values);
                const encoded = abiCoder.encode(types, processedValues);
                const typeSignature = `(${types.join(',')})`;
                const readableParams = types.map((type: any, index: number) => `  ${type}: ${this.formatValue(values[index])}`).join('\n');
                return {
                    content: [{
                            type: "text",
                            text: `abi encode result:\n\n📋 parameter types: ${typeSignature}\n📝 parameter values:\n${readableParams}\n\n🔢 encoded result: ${encoded}\n\n📏 length: ${(encoded.length - 2) / 2} bytes`
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


        static async abiEncodeWithSignature({ functionSignature, values }: {functionSignature: string, values: any}) {
            try {
                const iface = new ethers.Interface([`function ${functionSignature}`]);
                const functionName = functionSignature.split('(')[0];
                const encoded = iface.encodeFunctionData(functionName, values);
                const selector = encoded.slice(0, 10);
                const params = encoded.slice(10);
                const readableParams = values.map((value: any, index: number) => `  parameter ${index + 1}: ${this.formatValue(value)}`).join('\n');
                return {
                    content: [{
                            type: "text",
                            text: `abi encode with signature result:\n\n📋 function signature: ${functionSignature}\n📝 parameter values:\n${readableParams}\n\n🔧 function selector: ${selector}\n📊 parameter data: 0x${params}\n🔢 encoded: ${encoded}\n\n📏 total length: ${(encoded.length - 2) / 2} bytes`
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


        static async abiDecode({ types, data }:  {types: any, data: any}) {
            try {
                const cleanData = data.startsWith('0x') ? data : `0x${data}`;
                const decoded = abiCoder.decode(types, cleanData);
                const decodedValues = types.map((type: any, index: number) => {
                    const value = decoded[index];
                    return `  ${type}: ${this.formatDecodedValue(value, type)}`;
                }).join('\n');
                return {
                    content: [{
                            type: "text",
                            text: `abi decode result:\n\n📊 original data: ${cleanData}\n📋 parameter types: (${types.join(',')})\n\n📝 decoded values:\n${decodedValues}`
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
        };
    
    static processValues(types: any, values: any) {
        return values.map((value: any, index: number) => {
            const type = types[index];
            if (type.includes('uint') || type.includes('int')) {
                return BigInt(value.toString());
            }
            if (type === 'address') {
                if (typeof value !== 'string') {
                    throw new Error(`address type parameter must be a string: ${value}`);
                }
                if (!isAddress(value)) {
                    throw new Error(`invalid ethereum address: ${value}`);
                }
                return value;
            }
            if (type === 'bool') {
                if (typeof value === 'boolean')
                    return value;
                if (typeof value === 'string') {
                    const lowercaseValue = value.toLowerCase();
                    if (lowercaseValue === 'true')
                        return true;
                    if (lowercaseValue === 'false')
                        return false;
                    throw new Error(`boolean value must be true or false: ${value}`);
                }
                throw new Error(`invalid boolean value: ${value}`);
            }
            if (type.startsWith('bytes')) {
                if (typeof value !== 'string') {
                    throw new Error(`bytes type parameter must be a string: ${value}`);
                }
                return value.startsWith('0x') ? value : `0x${value}`;
            }
            return value;
        });
    };

    static formatValue(value: any) {
        if (typeof value === 'string') {
            return `"${value}"`;
        }
        return String(value);
    };
    
    static formatDecodedValue(value: any, type: any) {
        if (typeof value === 'bigint') {
            return value.toString();
        }
        if (type === 'address') {
            return value.toString();
        }
        if (type === 'bool') {
            return value ? 'true' : 'false';
        }
        if (type.startsWith('bytes')) {
            return value.toString();
        }
        if (typeof value === 'string') {
            return `"${value}"`;
        }
        return String(value);
    }
}
//# sourceMappingURL=abi-encoder.js.map