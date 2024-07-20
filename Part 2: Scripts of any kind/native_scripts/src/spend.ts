import { Address, Credential, DataI, TxBuilder, Value } from "@harmoniclabs/plu-ts";
import { script } from "./script";
import { addr0, priv0 } from "./addrs";
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

    const txBuilder = new TxBuilder(
        await blockfrost.getProtocolParameters()
    );

    let tx = txBuilder.buildSync({
        inputs: [
            {
                utxo: utxos[0],
                nativeScript: script
            }
        ],
        changeAddress: addr0
    });

    // remove redeeers (not needed)
    tx = txBuilder.overrideTxRedeemers(tx, []);

    tx.signWith( priv0 );

    console.log(
        JSON.stringify(
            tx.toJson(),
            undefined,
            2
        )
    );

    await blockfrost.submitTx( tx );

    console.log( "link: https://preprod.cardanoscan.io/transaction/" + tx.hash.toString() );
}();