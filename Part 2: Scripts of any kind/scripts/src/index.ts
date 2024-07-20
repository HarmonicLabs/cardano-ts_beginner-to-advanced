import { Address, Credential, NativeScript, nativeScriptToCbor, Script } from "@harmoniclabs/plu-ts";

void async function main()
{
    const script = new Script<"NativeScript">(
        "NativeScript",
        nativeScriptToCbor({
            type: "after",
            slot: 0
        }).toBuffer()
    );

    const scirptAddr = Address.testnet(
        Credential.script( script.hash )
    );

}();