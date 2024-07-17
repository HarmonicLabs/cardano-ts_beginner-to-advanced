import { Address, Credential, harden, PublicKey, StakeCredentials, XPrv } from "@harmoniclabs/plu-ts";
import { fromHex, toHex } from "@harmoniclabs/uint8array-utils";
import { mnemonicToEntropy } from "bip39";
import { config } from "dotenv";

config();

void async function main()
{
    // extract the (extended) private key from the seed phrase
    const xprv = XPrv.fromEntropy(
        mnemonicToEntropy(
            process.env.SEED_PHRASE!
        )
    );

    // get the default address of the private key
    //
    // payment key at path "m/1852'/1815'/0'/0/0"
    // stake key at path "m/1852'/1815'/0'/2/0"
    const addr = Address.fromXPrv( xprv, "testnet" );

    // make sure the addres is the same shown by eternl
    console.log(addr.toString());
    
    // alternatively you can get the `Address` object
    // from the address string that eternl shows you
    // by calling `Address.fromString`
    // 
    // however in this way we don't have access to the private key
    // that we will need to sign transactions later
    // const realAddr = Address.fromString("<your eternl address here>")
    
}();