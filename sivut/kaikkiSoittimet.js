import {instrumentit} from "./handleData.js"

function kaikkiSoittimet() {
    let mainContent = document.getElementById("mainContent")
    mainContent.innerHTML = ""
    let h3 = document.createElement("h3")
    h3.textContent = "Tietokannasta löytyvät soittimet:"
    mainContent.appendChild(h3)

    for (const [key, value] of Object.entries(instrumentit)) {
        let h4 = document.createElement("h4")
        h4.textContent = key
        mainContent.appendChild(h4)
        for (const x in value) {
            let p = document.createElement("p")
            p.classList.add("lead", "my-4")
            p.textContent = instrumentit[key][x].brand + " "+ instrumentit[key][x].model + ", vuodelta: " + instrumentit[key][x].year
            mainContent.appendChild(p)
        }
    }

}

export default kaikkiSoittimet;