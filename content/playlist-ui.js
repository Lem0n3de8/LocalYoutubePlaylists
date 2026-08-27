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

    setupPlaylistUI();
    await renderPlaylists();
}

function setupPlaylistUI(){
    const createButton = document.getElementById("create-playlist");
    const createForm = document.getElementById("create-playlist-form");
    const playlistName = document.getElementById("playlist-name");
    const confirmButton = document.getElementById("confirm-create-playlist");
    const cancelButton = document.getElementById("cancel-create-playlist");

    createButton.addEventListener("click", () => {
        createForm.hidden = false;
        createButton.hidden = true;
        playlistName.focus();
    });

    cancelButton.addEventListener("click", () => {
        createForm.hidden = true;
        createButton.hidden = false;
        playlistName.value = "";
    });

    confirmButton.addEventListener("click", async () => {
        const name = playlistName.value.trim();

        if (!name) {
            return;
        }

        const success = await createPlaylist(name);

        if (success) {
            playlistName.value = "";
            createForm.hidden = true;
            createButton.hidden = false;

            await renderPlaylists();
        }
    });

    playlistName.addEventListener("keydown", async (event) => {
        if (event.key === "Enter") {
            confirmButton.click();
        }
    });
}

async function renderPlaylists(){
    const playlists = await getPlaylists();
    const container = document.getElementById("playlist-container");

    // Remove existing playlist elements
    container.innerHTML = "";

    // Render playlists

    let i = 0;
    for (const playlist of playlists){
        i++;
        const div = document.createElement("div");
        const h3 = document.createElement("h3");
        const delButton = document.createElement("button");

        div.id = playlist.id;
        div.classList.add("playlist-div");
        
        h3.textContent = i + ". "+playlist.name;
        
        delButton.textContent = "x";
        delButton.classList.add("delete-playlist");

        delButton.addEventListener("click", async() =>{
            if (!delButton.classList.contains("confirm-delete")){
                delButton.classList.add("confirm-delete");
                delButton.textContent = "Delete";

                setTimeout(() => {
                    delButton.classList.remove("confirm-delete");
                    delButton.textContent = "x";
                }, 3000);

                return;
            }

            await deletePlaylist(playlist.id);
            await renderPlaylists();
        })

        div.appendChild(h3);
        div.appendChild(delButton)
        container.appendChild(div);
    }
}


// Temp change, if classic button.addeventlistener doesn't work,
// use this structure
//
// document.addEventListener("click", async (event) => {
//     if (event.target.closest("#create-playlist")) {
//         const success = await createPlaylist("Playlist");
//         if (success) await renderPlaylists();
//     }
// });