function addHeading(){
    const custom_id = "custom_id";
    
    // Check if heading is already added
    if (document.getElementById(custom_id)){
        return;
    } 

    const div = document.getElementById("title");
    if (!div) return;

    const h1 = div.querySelector("h1");
    if (!h1) return;

    const h2 = document.createElement("h2");
    h2.id = custom_id;
    h2.textContent = "My new subtitle";

    h1.appendChild(h2);

}

const observer = new MutationObserver(() => {
    console.log("DOM Changed");
    addHeading();
})

observer.observe(document.body, {
    childList: true,
    subtree: true
})