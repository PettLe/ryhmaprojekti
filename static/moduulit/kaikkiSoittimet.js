async function kaikkiSoittimet() {
    // Noudetaan fetch()-funktiolla mySQL-data Flaskiltä. Awaitillä odotetaan vastausta ja datan latautumista ennen kuin jatketaan eteenpäin
    let response = await fetch('/testi')
    let data = await response.json()
    console.log(data)


    // Etsitään HTML:stä id:n perusteella mainContent boksi. Tyhjennetään sen innerHTML.
    let mainContent = document.getElementById("mainContent")
    mainContent.innerHTML = ""
    let h2 = document.createElement("h2")
    h2.textContent = "Tietokannasta löytyvät soittimet:"
    mainContent.appendChild(h2)

    // Iteroidaan läpi instrumentit-dictionaryn hakien sieltä avain-arvo -parit. Tässä tapauksessa arvo on uusi dictionary yksittäisestä soittimesta
    for (const [avain, arvo] of Object.entries(data)) {
        // Tehdään jokaisesta avaimesta otsikko sivulle
        let h4 = document.createElement("h4")
        h4.classList.add("fs-3")
        h4.textContent = avain + ":"
        mainContent.appendChild(h4)

        // Iteroidaan läpi jokaisen vastaantulevan valuen, tässä tapauksessa ne ovat yksittäisiä soitin dictionaryjä
        for (const index in arvo) {
            let p = document.createElement("p")
            let delBtn = document.createElement("i")
            delBtn.id = data[avain][index].uniqueID
            delBtn.classList.add("bi", "bi-x-lg", "delBtn")
            p.id = data[avain][index].uniqueID
            delBtn.addEventListener("click", (event) => {
                document.getElementById(delBtn.id).outerHTML = "";
                console.log(delBtn.id)
                // poistaSoitin(event)
            })
            p.classList.add("lead", "fs-5", "fw-semibold", "my-4")
            p.textContent = "\t" + data[avain][index].valmistaja + " "+ data[avain][index].malli + ", vuodelta: " + data[avain][index].vuosi
            p.appendChild(delBtn)
            mainContent.appendChild(p)
        }
    }

}

export {kaikkiSoittimet};