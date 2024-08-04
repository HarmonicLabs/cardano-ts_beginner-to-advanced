import { BlockfrostPluts } from "@harmoniclabs/blockfrost-pluts";
import { config } from "dotenv";

config();

export const blockfrost = new BlockfrostPluts({
    projectId: process.env.BLOCKFROST_API_KEY!
});