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
    console.log("script", script.toJson());

    const utxos = await blockfrost.addressUtxos( addr0 );

    const txBuilder = new TxBuilder(
        await blockfrost.getProtocolParameters()
    );

    const tx = txBuilder.buildSync({
        inputs: [
            { utxo: utxos.find( u => u.resolved.value.lovelaces >= 12_000_000 )! }
        ],
        changeAddress: addr0,
        outputs: [
            {
                address: scriptAddr,
                value: Value.lovelaces( 10_000_000 )
            }
        ]
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