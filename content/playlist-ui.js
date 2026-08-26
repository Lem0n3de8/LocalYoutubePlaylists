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

    displayPlaylists();
}

async function displayPlaylists(){
    const playlists = await getPlaylists();
    const container = document.getElementById("playlist-container");

    // Remove existing playlist elements
    container.innerHTML = "";

    // Render playlists
    for (const playlist of playlists){
        const div = document.createElement("div");
        const h3 = document.createElement("h3");

        div.id = playlist.id;
        div.classList.add("playlist-div");
        
        h3.textContent = playlist.name;
        
        div.appendChild(h3);
        container.appendChild(div);
    }
}

document.addEventListener("click", async (event) => {
    if (event.target.closest("#create-playlist")) {
        const success = await createPlaylist("Playlist");
        if (success) await displayPlaylists();
    }
});