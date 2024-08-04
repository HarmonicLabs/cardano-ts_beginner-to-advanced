import { Address, Credential, harden, PublicKey, XPrv } from "@harmoniclabs/plu-ts";
import { mnemonicToEntropy } from "bip39";
import { config } from "dotenv";

config();

export const xprv_root = XPrv.fromEntropy(
    mnemonicToEntropy(
        process.env.SEED_PHRASE!
    )
);

export const priv0 = (
    xprv_root
    .derive(harden(1852))
    .derive(harden(1815))
    .derive(harden(0))
    .derive(0)
    .derive(0)
);

export const priv1 = (
    xprv_root
    .derive(harden(1852))
    .derive(harden(1815))
    .derive(harden(1))
    .derive(0)
    .derive(0)
);

export const addr0 = Address.fromXPrv( xprv_root, "testnet" );

export const addr1 = Address.testnet(
    Credential.keyHash(
        new PublicKey(
            priv1.public().toPubKeyBytes()
        ).hash
    )
);