import { FourByteService } from "./fourbyte";
import { AbiEncoder } from "./abi-encoder";
import { UtilsService } from "./utils";


export class CastCommands {
    fourByteService;
    abiEncoder;
    utilsService;
    constructor() {
        this.fourByteService = new FourByteService();
        this.abiEncoder = new AbiEncoder();
        this.utilsService = new UtilsService();
    }
}
//# sourceMappingURL=index.map