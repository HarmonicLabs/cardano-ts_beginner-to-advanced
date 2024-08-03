import { Address, Credential, DataI, defaultProtocolParameters, TxBuilder, Value } from "@harmoniclabs/plu-ts";
import { script } from "./script";
import { addr0, priv0, priv1 } from "./addrs";
import { blockfrost } from "./blockfrost";

void async function main()
{
    const scriptAddr = Address.testnet(
        Credential.script( script.hash )
    );

    console.log("script.hash", script.hash.toString());
    console.log("scriptAddr", scriptAddr.toString());

    const utxos = await blockfrost.addressUtxos( scriptAddr );

    if( utxos.length === 0 )
    throw new Error(
        "missing utxos on script " + scriptAddr.toString()
    );

    const myUtxos = await blockfrost.addressUtxos( addr0 );

    const pps = await blockfrost.getProtocolParameters()

    const txBuilder = new TxBuilder(
        pps
    );

    let tx = txBuilder.buildSync({
        inputs: [
            {
                utxo: utxos[0],
                inputScript: {
                    script: script,
                    redeemer: new DataI( 0 )
                }
            }
        ],
        collaterals: [
            myUtxos[0]
        ],
        changeAddress: addr0
    });

    tx.signWith( priv0 );

    console.log(
        JSON.stringify(
            tx.toJson(),
            undefined,
            2
        )
    );

    await blockfrost.submitTx( tx );
    
    console.log( "link: https://preprod.cexplorer.io/tx/" + tx.hash.toString() );
}();