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
}