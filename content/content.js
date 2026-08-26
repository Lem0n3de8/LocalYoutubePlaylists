function addPlaylistButton(){
    const button_id = "playlist_button";
    const playlist_icon_id = "playlist_icon";

    // Check if button or icon is already added
    if (document.getElementById(button_id) || document.getElementById(playlist_icon_id)){
        return;
    }

    // Selectors where button is inserted
    const div = document.getElementById("title");
    if (!div) return;

    const h1 = div.querySelector("h1");
    if (!h1) return;


    const button = document.createElement("button");
    button.id = button_id;

    const playlist_icon = document.createElement("img");
    playlist_icon.id = playlist_icon_id;
    playlist_icon.width = 30;
    playlist_icon.height = 30;
    playlist_icon.src = browser.runtime.getURL("images/playlist-icon.png");

    h1.appendChild(button).appendChild(playlist_icon);
}

document.addEventListener("click", (event) => {
    if (event.target.closest("#playlist_button")) {
        console.log("Playlist button clicked!");
    }
});

const observer = new MutationObserver(() => {
    addPlaylistButton();
})

observer.observe(document.body, {
    childList: true,
    subtree: true
})