import { bool, compile, data, passert, pBool, perror, pfn, pmakeUnit, pmatch, PScriptContext, Script, ScriptType, unit } from "@harmoniclabs/plu-ts";
import { addr0, addr1 } from "./addrs";

const contract = pfn([
    PScriptContext.type
], unit)
(({ tx, purpose, redeemer }) => 
    pmatch( purpose )
    .onSpending(() => {

        // modify this
        const myCheck = pBool( false );
        
        return passert.$( myCheck );
    })
    ._( _ => perror( unit ) )
);

const compiled = compile( contract );

export const script = new Script(
    ScriptType.PlutusV3,
    compiled
);