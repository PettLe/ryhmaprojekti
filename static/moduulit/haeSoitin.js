async function haeSoitin() {
    class Soitin {
        constructor(tyyppi, valmistaja, malli, vuosi, uid) {
        this.tyyppi = tyyppi
        this.valmistaja = valmistaja
        this.malli = malli
        this.vuosi = vuosi
        this.uid = uid
        }
    }
    
    let yksi = new Soitin("kitara", "gibson", "les paul", 1965, 123123)
    let kaksi = new Soitin("kitara", "fender", "stratocaster", 1991, 443434343)
    let kolme = new Soitin("rummut", "pearl", "kolinaa", 2002, 666)
    let nelj = new Soitin("kitara", "fender", "telecaster", 1978, 99999)
    
    let test = {"kitara": [yksi, kaksi, nelj], "rummut": [kolme]}
    let hakusana = "gibson"
    
    for (const [avain, arvo] of Object.entries(test)) {
          for (const index in arvo) {
                if (test[avain][index].valmistaja === hakusana || test[avain][index].malli === hakusana) {
                console.log(test[avain][index])
                }}}
    // Haetaan SQL-data Flaskiltä
   // let response = await fetch('/data', {method: 'GET'})
    //let data = await response.json()
    //console.log(data)
   

    // Etsitään HTML:stä id:n perusteella mainContent boksi. Tyhjennetään sen innerHTML.
    let mainContent = document.getElementById("mainContent")
    mainContent.innerHTML = ""

    let haku = document.createElement("input")
    haku.type = "text"
    haku.classList.add("form-control", "mb-3")
    haku.placeholder = "Hae valmistajaa tai mallia"
    mainContent.appendChild(haku)

    let hakuBtn = document.createElement("button")
    hakuBtn.type = "button"
    hakuBtn.textContent = "Hae soitinta"
    hakuBtn.classList.add("btn", "btn-dark", "w-50", "mt-5")
    mainContent.appendChild(hakuBtn)
    
}

export { haeSoitin };

