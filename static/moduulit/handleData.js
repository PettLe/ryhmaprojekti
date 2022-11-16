// Apulistat (ja dictionary) datan väliaikaseen käsittelyyn
let kitarat = []
let bassot = []
let rummut = []
let instrumentit = {}

// Funktio joka luo uniikin ID:n myöhempää tunnistamista varten jokaiselle databaseen lisätylle soittimelle
function uniqueID() {
    return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
    }

// Omat Luokat jokaiselle soitintyypille
class Kitara {
    constructor(tyyppi, valmistaja, malli, vuosi, uid) {
    this.tyyppi = tyyppi
    this.valmistaja = valmistaja
    this.malli = malli
    this.vuosi = vuosi
    this.uid = uid
    }
}
class Basso {
    constructor(tyyppi, valmistaja, malli, vuosi, uid) {
    this.tyyppi = tyyppi
    this.valmistaja = valmistaja
    this.malli = malli
	this.vuosi = vuosi
    this.uid = uid
}
}
class Rummut {
    constructor(tyyppi, valmistaja, malli, vuosi, uid) {
    this.tyyppi = tyyppi
    this.valmistaja = valmistaja
    this.malli = malli
    this.vuosi = vuosi
    this.uid = uid
    }
}

// Funktio joka tunnistaa soitinTyyppi-parametrin avulla soitintyypin ja sen perusteella luo Luokka-objektin soittimesta.
// Sen jälkeen uusi soitin pushataan omaan listaansa
function luoSoitin(soitinTyyppi, valmistaja, malli, vuosi) { 
	let soitin;
    if (soitinTyyppi === "kitara") {
        soitin = new Kitara(soitinTyyppi, valmistaja, malli, vuosi, uniqueID())
        // kitarat.push(guitar)
    } else if (soitinTyyppi == "basso") {
        soitin = new Basso(soitinTyyppi, valmistaja, malli, vuosi, uniqueID())
        // bassot.push(bass)
    } else if (soitinTyyppi == "rummut") {
        soitin = new Rummut(soitinTyyppi, valmistaja, malli, vuosi, uniqueID())
        // rummut.push(drums)
    }

    // Instrumentit on dictionary, johon lisätään jokaisen soitintyypin omat listat
    instrumentit["kitarat"] = kitarat
    instrumentit["bassot"] = bassot
    instrumentit["rummut"] = rummut


    // Lähettää instrumentit-arrayn Flaskille
    fetch("http://127.0.0.1:5000/data", 
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
        // Stringifyllä data muutetaan JSON-muotoon.
        body:JSON.stringify(soitin)}).then(res=>{
                if(res.ok){
                    return res.json()
                }else{
                    alert("AAAA EI TOIMIIII")
                }
            }).then(jsonResponse=>{
                
                // Console.logataan data
                console.log(jsonResponse)
            } 
            ).catch((err) => console.error(err));
		}
// 	fetch("http://127.0.0.1:5000/read", 
//         {
//             method: 'GET',
//             headers: {
//                 'Content-type': 'application/json',
//                 'Accept': 'application/json'
//             },
//         // Stringifyllä data muutetaan JSON-muotoon.
//         body:JSON.stringify(soitin)}).then(res=>{
//                 if(res.ok){
//                     return res.json()
//                 }else{
//                     alert("AAAA EI TOIMIIII")
//                 }
//             }).then(jsonResponse=>{
                
//                 // Console.logataan data
//                 console.log(jsonResponse)
//             } 
//             ).catch((err) => console.error(err));
// }
// Kovakoodataan muutama instrumentti
// luoSoitin("kitara", "Gibson", "Les Paul", 1952)
// luoSoitin("rummut", "Pearl", "En tiedä rummuista mitään", 2018)
// luoSoitin("kitara", "Fender", "Stratocaster", 1954)
// luoSoitin("basso", "Ibanez", "Hevikeppi", 2012)
// let soittimet = []
// fetch('/testi')
//   .then((res)=>{ res.json().then(json => { soittimet = json}) })

export { instrumentit, luoSoitin, uniqueID };