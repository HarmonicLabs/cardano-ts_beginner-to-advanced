import { Address, Credential } from "@harmoniclabs/plu-ts";

void async function main()
{
    const addr = Address.fromString("addr_test1qzq55vqf303tduqa0f6r4rmamt2lxw5c98yp5rcyekl6aupgrkxchwfa7uzxtc4sssn4hdp8pdhpe0gvnl3tec8yzjsq5enqa4");

    console.log(
        addr
    );

    const mainnetAddr = Address.mainnet(
        addr.paymentCreds
    );

    console.log( mainnetAddr );
    console.log( mainnetAddr.toString() );

    const creds = Credential.script( addr.paymentCreds.hash );

    const scriptAddr = Address.testnet( creds );

    console.log( scriptAddr.toString() );
}();