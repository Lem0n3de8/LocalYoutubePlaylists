function addHeading(){
    const custom_id = "playlist_icon";

    // Check if heading is already added
    if (document.getElementById(custom_id)){
        return;
    } 

    const div = document.getElementById("title");
    if (!div) return;

    const h1 = div.querySelector("h1");
    if (!h1) return;

    const playlist_icon = document.createElement("img");
    playlist_icon.id = custom_id;
    playlist_icon.src = browser.runtime.getURL("images/playlist-icon.png");

    h1.appendChild(playlist_icon);

}

const observer = new MutationObserver(() => {
    console.log("DOM Changed");
    addHeading();
})

observer.observe(document.body, {
    childList: true,
    subtree: true
})