import { bool, compile, data, pBool, perror, pfn, pmakeUnit, pmatch, PScriptContext, Script, ScriptType, unit } from "@harmoniclabs/plu-ts";
import { addr0, addr1 } from "./addrs";

const alwaysSucceed = pfn([
    PScriptContext.type
], unit)
(({ tx, purpose, redeemer }) => pmakeUnit() );

const compiledAlwaysScucceed = compile( alwaysSucceed );

const scriptAlwaysSucceed = new Script(
    ScriptType.PlutusV3,
    compiledAlwaysScucceed
);


// -------------------------------------------------------------------------------------- //
// ------------------------------------- only spend ------------------------------------- //
// -------------------------------------------------------------------------------------- //

const onlySpend = pfn([
    PScriptContext.type
], unit)
(({ tx, purpose, redeemer }) =>
    pmatch( purpose )
    .onSpending(() => pmakeUnit())
    ._(() => perror( unit ))
);

const compiledOnlySpend = compile( onlySpend );

const scriptOnlySpend = new Script(
    ScriptType.PlutusV3,
    compiledOnlySpend
);

// -------------------------------------------------------------------------------------- //
// ------------------------------------- only mint  ------------------------------------- //
// -------------------------------------------------------------------------------------- //

const onlyMint = pfn([
    PScriptContext.type
], unit)
(({ tx, purpose, redeemer }) =>
    pmatch( purpose )
    .onMinting(() => pmakeUnit())
    ._(() => perror( unit ))
);

const compiledOnlyMint = compile( onlyMint );

const scriptOnlyMint = new Script(
    ScriptType.PlutusV3,
    compiledOnlyMint 
);


// -------------------------------------------------------------------------------------- //
// --------------------------------------- export --------------------------------------- //
// -------------------------------------------------------------------------------------- //

export const script = scriptOnlyMint;