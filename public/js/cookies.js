window.addEventListener("load", () => {

    const section = document.createElement("div");
    section.className = "cookies";
    section.id="message"

    const h2 = document.createElement("h2");
    h2.textContent="We have updated our privacy and cookie policy";
    
    const p = document.createElement("p");
    p.className = "parrafo";
    p.textContent = "We have made important changes to our privacy and cookie policy and want you to know what this means for you and your data."

    const buttonAccept = document.createElement("button");
    buttonAccept.textContent = "Accept"
    buttonAccept.className="cookies_button"
    buttonAccept.id = "buttonAccept"

    const section_button = document.createElement("div");
    section_button.className="cookies_buttons"

    const linkCookies= document.createElement('a');

    linkCookies.href = '/cookiePolicy';

    linkCookies.textContent = 'Read';

    const buttonReadCookiesPolicy = document.createElement("button");
    // buttonReadCookiesPolicy.textContent = "Read"
    buttonReadCookiesPolicy.className="cookies_button"

    const footer = document.getElementById("footer")

    section.appendChild(h2);
    section.appendChild(p);
    section.appendChild(section_button);
    buttonReadCookiesPolicy.append(linkCookies);
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