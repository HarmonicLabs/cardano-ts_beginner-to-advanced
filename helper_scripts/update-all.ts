import { exec } from "child_process";
import { readdir } from "fs/promises";

void async function main()
{
    await testDir(".");
}()

function dirEntries( path: string )
{
    return readdir( path, {
        encoding: "utf-8",
        recursive: false,
        withFileTypes: true
    });
}

async function testDir( path: string )
{
    const dir = await dirEntries( path );
    await Promise.all(
        dir.map( async entry => {
            if( entry.name === "node_modules" ) return;
            const nextPath = `${path}/${entry.name}`;
            if( entry.isDirectory() ) await testDir( nextPath );
            if(!(
                entry.isFile() &&
                entry.name === "package.json"
            )) return;
            await new Promise<void>( res => 
                exec(
                    `cd ${path} && npm update`,
                    ( err, stdout, stderr ) => {
                        res();
                    }
                )
            );
            console.log("Updated", nextPath);
        })
    );
}