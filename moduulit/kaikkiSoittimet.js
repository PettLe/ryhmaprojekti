import {instrumentit} from "./handleData.js"

function kaikkiSoittimet() {
    // Etsitään HTML:stä id:n perusteella mainContent boksi. Tyhjennetään sen innerHTML.
    let mainContent = document.getElementById("mainContent")
    mainContent.innerHTML = ""
    let h2 = document.createElement("h2")
    h2.textContent = "Tietokannasta löytyvät soittimet:"
    mainContent.appendChild(h2)

    // Iteroidaan läpi instrumentit-dictionaryn hakien sieltä avain-arvo -parit. Tässä tapauksessa arvo (value) on uusi dictionary yksittäisestä soittimesta
    for (const [key, value] of Object.entries(instrumentit)) {
        // Tehdään jokaisesta avaimesta otsikko sivulle
        let h4 = document.createElement("h4")
        h4.classList.add("fs-3")
        h4.textContent = key + ":"
        mainContent.appendChild(h4)

        // Iteroidaan läpi jokaisen vastaantulevan valuen, tässä tapauksessa ne ovat yksittäisiä soitin dictionaryjä
        for (const index in value) {
            let p = document.createElement("p")
            p.classList.add("lead", "fs-5", "fw-semibold", "my-4")
            p.textContent = "\t" + instrumentit[key][index].brand + " "+ instrumentit[key][index].model + ", vuodelta: " + instrumentit[key][index].year
            mainContent.appendChild(p)
        }
    }

}

export default kaikkiSoittimet;