import { bool, compile, data, DataI, int, passert, pBool, pchooseData, pData, perror, pfn, pif, plet, pmatch, PScriptContext, PTxOut, punIData, Script, ScriptType, unit } from "@harmoniclabs/plu-ts";


const contract = pfn([
    PScriptContext.type
], unit)
(({ tx, purpose, redeemer }) => 
    pmatch( purpose )
    .onSpending(({ utxoRef: validatingUtxoRef, datum: maybeDatum }) => {

        const input = plet(
            pmatch(
                tx.inputs.find(({ utxoRef }) => utxoRef.eq( validatingUtxoRef ) )
            )
            .onJust(({ val }) => val.resolved )
            .onNothing( _ => perror( PTxOut.type ) )
        );

        const ownAddr = plet( input.address );
        const ownValue = plet( input.value );

        const datum = plet(
            maybeDatum.default(
                pData( new DataI( 0 ) )
            )
        );

        const nTx = plet( punIData.$( datum ) );

        const ownOut = plet(
            pmatch(
                tx.outputs.find( out => out.address.eq( ownAddr ) )
            )
            .onJust(({ val }) => val )
            .onNothing( _ => perror( PTxOut.type ) )
        );

        const nextTxCount = plet(
            pmatch( ownOut.datum )
            .onInlineDatum(({ datum }) => punIData.$( datum ) )
            ._( _ => perror( int ) )
        );

        const isDatumIncremented = plet( nextTxCount.eq( nTx.add( 1 ) ) );

        const isValueLocked = plet(
            ownOut.value.lovelaces
            .gtEq( ownValue.lovelaces )
        );

        // modify this
        const myCheck = plet(
            nTx.gtEq( 3 )
            .or(
                isDatumIncremented
                .and( isValueLocked )
            )
        );
        
        return passert.$( myCheck );
    })
    ._( _ => perror( unit ) )
);

const compiled = compile( contract );

export const script = new Script(
    ScriptType.PlutusV3,
    compiled
);