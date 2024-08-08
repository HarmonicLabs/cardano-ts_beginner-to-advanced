import { Address, DataConstr, DataI, TxOut, UTxO, Value } from "@harmoniclabs/plu-ts";

void async function main()
{
    const addr = Address.fromString("addr_test1qzq55vqf303tduqa0f6r4rmamt2lxw5c98yp5rcyekl6aupgrkxchwfa7uzxtc4sssn4hdp8pdhpe0gvnl3tec8yzjsq5enqa4");

    // documentation at
    // https://pluts.harmoniclabs.tech/offchain/cardano-ledger-ts/classes/TxOut
    const txOut = new TxOut({
        address: addr,
        value: Value.lovelaces( 0 ),
        datum: new DataI( 0 ),
        refScript: undefined
    });

}();