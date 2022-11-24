// Funktio joka luo uniikin ID:n myöhempää tunnistamista varten jokaiselle databaseen lisätylle soittimelle
function uniqueID() {
    return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
    }

// Omat Luokat jokaiselle soitintyypille
class Soitin {
    constructor(tyyppi, valmistaja, malli, vuosi, uid) {
    this.tyyppi = tyyppi
    this.valmistaja = valmistaja
    this.malli = malli
    this.vuosi = vuosi
    this.uid = uid
    }
}

// Funktio joka tunnistaa soitinTyyppi-parametrin avulla soitintyypin ja sen perusteella luo Luokka-objektin soittimesta.
function luoSoitin(soitinTyyppi, valmistaja, malli, vuosi) { 
    let soitin = new Soitin(soitinTyyppi, valmistaja, malli, vuosi, uniqueID())


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
                if (res.ok) {
                    return res.json()
                }
				else {
                    alert("AAAA EI TOIMIIII")
                }
            }).then(jsonResponse=>{
                
                // Console.logataan data
                console.log(jsonResponse)
            } 
            ).catch((err) => console.error(err));
		}

// Delete-toiminnallisuus. Lähetetään Flaskille poistettavan kohteen ID.
function poistaSoitin(id) {
    fetch("http://127.0.0.1:5000/delete", 
    {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        },
    // Stringifyllä data muutetaan JSON-muotoon.
    body:JSON.stringify(id)}).then(res=>{
            if(res.ok){
                return res.json()
            }else{
                alert("Poisto ei onnistu")
            }
        }).then(jsonResponse=>{
            
            // Console.logataan data
            console.log(jsonResponse)
        } 
        ).catch((err) => console.error(err));
    }

export { luoSoitin, uniqueID, poistaSoitin };