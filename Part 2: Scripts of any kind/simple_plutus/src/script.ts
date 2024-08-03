import { bool, compile, data, pBool, perror, pfn, pmakeUnit, PScriptContext, Script, ScriptType, unit } from "@harmoniclabs/plu-ts";
import { addr0, addr1 } from "./addrs";

const contract = pfn([
    PScriptContext.type
], unit)
( (ctx) => pmakeUnit() );

const compiled = compile( contract );

export const script = new Script(
    ScriptType.PlutusV3,
    compiled
);