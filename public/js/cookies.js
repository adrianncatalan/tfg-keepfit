window.addEventListener("load", () => {

    const section = document.createElement("div");
    section.className = "cookies";
    section.id="message"

    const h2 = document.createElement("h2");
    h2.textContent="¿Aceptas nuestras Cookies?";
    
    const p = document.createElement("p");
    p.textContent = "Usamos cookies para mejorar tu experiencia en la web."

    const section_button = document.createElement("div");
    section_button.className="cookies_buttons"

    const buttonAccept = document.createElement("button");
    buttonAccept.textContent = "Yes"
    buttonAccept.className="cookies_button"
    buttonAccept.id = "buttonAccept"

    const buttonReadCookiesPolicy = document.createElement("button");
    buttonReadCookiesPolicy.textContent = "Read cookies Policy"
    buttonReadCookiesPolicy.className="cookies_button"

    const footer = document.getElementById("footer")

    section.appendChild(h2);
    section.appendChild(p);
    section.appendChild(section_button);
    section_button.appendChild(buttonReadCookiesPolicy);
    section_button.appendChild(buttonAccept);

    footer.appendChild(section);

    const div = document.getElementById("message");
    document.getElementById("buttonAccept").addEventListener('click', ()=> {

        while(div.hasChildNodes){
            div.removeChild(div.firstElementChild);
            footer.removeChild(div);
        }
    });

});