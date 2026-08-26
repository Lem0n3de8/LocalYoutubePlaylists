async function showPlaylistUI() {
    const UI_id = "playlist-overlay"
    const existingUI = document.getElementById(UI_id);

    if (existingUI){
        existingUI.remove();
        return;
    }

    const url = browser.runtime.getURL("content/playlist-ui.html");

    const response = await fetch(url);
    const html = await response.text();

    document.body.insertAdjacentHTML("beforeend", html);

    console.log("Calling playlists");
    displayPlaylists();
}

async function displayPlaylists(){
    const playlists = await getPlaylists();
    console.log("Playlists are: ", playlists);

    const button = document.getElementById("create-playlist")

    for (const playlist of playlists){
        console.log("NEW PLAYLIST:", playlist);
        const div = document.createElement("div");
        const h3 = document.createElement("h3");

        div.id = playlist.id;
        div.classList.add("playlist-div");
        
        h3.textContent = playlist.name;
        
        div.appendChild(h3);
        button.before(div);

    }
}