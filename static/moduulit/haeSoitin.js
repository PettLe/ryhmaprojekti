import { poistaSoitin } from "./handleData.js";

// asynkroninen-funktio vaaditaan, koska fetch-funktion yhteydessä käytetään await-komentoa
async function haeSoitin() {
    // <<<KOVAKOODATTU TESTIVERSIO HAUSTA>>>
    // class Soitin {
    //     constructor(tyyppi, valmistaja, malli, vuosi, uid) {
    //     this.tyyppi = tyyppi
    //     this.valmistaja = valmistaja
    //     this.malli = malli
    //     this.vuosi = vuosi
    //     this.uid = uid
    //     }
    // }

    // let yksi = new Soitin("kitara", "gibson", "les paul", 1965, 123123)
    // let kaksi = new Soitin("kitara", "fender", "stratocaster", 1991, 443434343)
    // let kolme = new Soitin("rummut", "pearl", "kolinaa", 2002, 666)
    // let nelj = new Soitin("kitara", "fender", "telecaster", 1978, 99999)

    // let test = {"kitara": [yksi, kaksi, nelj], "rummut": [kolme]}
    // let hakusana = "gibson"

    // for (const [avain, arvo] of Object.entries(test)) {
    //       for (const index in arvo) {
    //             if (test[avain][index].valmistaja === hakusana || test[avain][index].malli === hakusana) {
    //             console.log(test[avain][index])
    //             }}}


    // Haetaan SQL-data Flaskiltä
    let response = await fetch('/data', {method: 'GET'})
    let data = await response.json()


    // Etsitään HTML:stä id:n perusteella mainContent boksi. Tyhjennetään sen innerHTML.
    let mainContent = document.getElementById("mainContent")
    mainContent.innerHTML = ""

    // Luodaan hakukenttä-elementti
    let haku = document.createElement("input")
    haku.type = "text"
    haku.classList.add("form-control", "mb-3")
    haku.placeholder = "Hae valmistajaa tai mallia"
    mainContent.appendChild(haku)

    // Luodaan hakunappi-elementti
    let hakuBtn = document.createElement("button")
    hakuBtn.type = "button"
    hakuBtn.textContent = "Hae soitinta"
    hakuBtn.classList.add("btn", "btn-dark", "w-50", "mt-5")
    mainContent.appendChild(hakuBtn)

    let tulosteDiv = document.createElement("div")

    // Sidotaan hakunappiin EventListenerillä toiminnallisuus, jota kutsutaan klikatessa
    hakuBtn.addEventListener("click", () => {
        tulosteDiv.innerHTML = "" // Tyhjennetään tuloskenttä joka kerta kun haku suoritetaan uusiksi

        // Haetaan hakukentästä hakusana. Muutetaan se (ja haettavat arvot) pieniksi kirjaimiksi, jotta kirjoitusasulla ei olisi merkitystä
        let hakusana = haku.value.toLowerCase()
        for (const [avain, arvo] of Object.entries(data)) { // Loopataan läpi SQL-datan, joka saatiin Flaskiltä
              for (const index in arvo) {
                // Jos hakusana vastaa tiedoista löytyvää soittimen valmistajaa tai mallia, renderöidään se sivulle
                    if (data[avain][index].valmistaja.toLowerCase() === hakusana || data[avain][index].malli.toLowerCase() === hakusana) {
                        let p = document.createElement("p")
                        let delBtn = document.createElement("i")
                        delBtn.id = data[avain][index].uniqueID             // Sekä poistonappi, että kohde saa ID:ksi soittimen uniikin ID:n
                        delBtn.classList.add("bi", "bi-x-lg", "delBtn")
                        p.id = data[avain][index].uniqueID 
                        delBtn.addEventListener("click", (event) => {
                            document.getElementById(delBtn.id).outerHTML = ""; // Poistetaan kaikki HTML p-elementistä jonka ID on sama kuin poistonappulan ID
                            poistaSoitin(delBtn.id) //Lähetetään kohteen id eteenpäin, jotta voidaan myöhemmin SQL:stä etsiä sitä vastaava soitin
                            })
                        p.classList.add("lead", "fs-5", "fw-semibold", "my-4")
                        p.textContent = "\t" + data[avain][index].valmistaja + " "+ data[avain][index].malli + ", vuodelta: " + data[avain][index].vuosi
                        p.appendChild(delBtn)
                        tulosteDiv.appendChild(p)
                        }}}
                    // Jos tulosteDiv on jäänyt tyhjäksi, tulostetaan ilmoitus siitä ettei soitinta löytynyt
                    if (tulosteDiv.innerHTML == "") {
                        let p = document.createElement("p")
                        p.classList.add("lead", "fs-5", "fw-semibold", "my-4")
                        p.textContent = "Hakusanalla " + hakusana + " ei löytynyt soitinta"
                        tulosteDiv.appendChild(p)
                        }
        mainContent.appendChild(tulosteDiv)
    })
}

export { haeSoitin };