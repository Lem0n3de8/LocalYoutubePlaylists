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
        })
        await browser.storage.local.set({playlists})
    }catch(error){
        console.error("Failed to create new playlist: ", error);
    }
}
