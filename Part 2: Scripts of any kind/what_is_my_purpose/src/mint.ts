import { Address, Credential, DataI, defaultProtocolParameters, TxBuilder, Value } from "@harmoniclabs/plu-ts";
import { script } from "./script";
import { addr0, addr1, priv0, priv1 } from "./addrs";
import { blockfrost } from "./blockfrost";
import { fromUtf8, toHex } from "@harmoniclabs/uint8array-utils";

void async function main()
{
    console.log("script.hash", script.hash.toString());

    const myUtxos = await blockfrost.addressUtxos( addr0 );

    const pps = await blockfrost.getProtocolParameters()

    const txBuilder = new TxBuilder(
        pps
    );

    let tx = txBuilder.buildSync({
        inputs: [
            { utxo: myUtxos[0] }
        ],
        collaterals: [
            myUtxos[0]
        ],
        mints: [
            {
                script: {
                    inline: script,
                    redeemer: new DataI( 0 )
                },
                value: {
                    policy: script.hash,
                    assets: [
                        {
                            name: fromUtf8("plu-ts token name"),
                            quantity: 1
                        },
                        {
                            name: fromUtf8("plu-ts"),
                            quantity: 69
                        }
                    ]
                }
            }
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