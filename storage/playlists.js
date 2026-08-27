async function getPlaylists() {
    try {
        const content = await browser.storage.local.get("playlists");
        return content.playlists || [];
    } catch (error) {
        console.error("Failed to get playlists:", error);
        return [];
    }
}


async function createPlaylist(name){
    try{
        const data = await browser.storage.local.get("playlists");
        const playlists = data.playlists || [];

        playlists.push({
            id: crypto.randomUUID(),
            name:name,
            videos:[]
        });

        await browser.storage.local.set({playlists});

        return true;
    }catch(error){
        console.error("Failed to create new playlist: ", error);
        return false;
    }
}

async function deletePlaylist(id){
    try{
        const data = await browser.storage.local.get("playlists");
        const playlists = data.playlists || [];

        const updatedPlaylists = playlists.filter(
            playlist => playlist.id !== id
        );

        await browser.storage.local.set({
            playlists: updatedPlaylists
        });
    }catch(error){
        console.error("Failed to delete playlist:", error);
    }
}