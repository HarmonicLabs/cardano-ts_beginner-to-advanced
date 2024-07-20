import { nativeScriptToCbor, Script } from "@harmoniclabs/plu-ts";
import { addr0, addr1 } from "./addrs";

export const afterOrigin = new Script<"NativeScript">(
    "NativeScript",
    nativeScriptToCbor({
        type: "after",
        slot: 0
    }).toBuffer()
);

export const multisig = new Script<"NativeScript">(
    "NativeScript",
    nativeScriptToCbor({
        type: "atLeast",
        required: 2,
        scripts: [
            {
                type: "sig",
                keyHash: addr0.paymentCreds.hash.toString()
            },
            {
                type: "sig",
                keyHash: addr1.paymentCreds.hash.toString()
            },
        ]
    }).toBuffer()
);

export const shared = new Script<"NativeScript">(
    "NativeScript",
    nativeScriptToCbor({
        type: "any",
        scripts: [
            {
                type: "sig",
                keyHash: addr0.paymentCreds.hash.toString()
            },
            {
                type: "sig",
                keyHash: addr1.paymentCreds.hash.toString()
            },
        ]
    }).toBuffer()
);

export const script = multisig;