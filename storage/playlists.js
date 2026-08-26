async function getPlaylists() {
    try {
        const content = await browser.storage.local.get("playlists");

        return [
            {
                id:"test",
                name: "programming",
                videos:[]
            },
            {
                id:"id2",
                name: "watch later",
                videos: []
            }
        ]
        return content.playlists || [];
    } catch (error) {
        console.error("Failed to get playlists:", error);
        return [];
    }
}
