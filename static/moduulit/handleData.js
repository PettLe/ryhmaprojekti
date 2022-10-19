// Importataan CDN:n avulla tarvittavia FireBase-toimintoja
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";    
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-analytics.js";
import { getFirestore, collection, addDoc, serverTimestamp, getDocs } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js'

// FireStroren asetukset, ei kannata koskea!
const firebaseConfig = {    
    apiKey: "AIzaSyDxgiAJie3UUDeaPovBcQhn-IH6ys4mj5c",    
    authDomain: "roina-6f1bf.firebaseapp.com",    
    projectId: "roina-6f1bf",    
    storageBucket: "roina-6f1bf.appspot.com",    
    messagingSenderId: "531435784591",    
    appId: "1:531435784591:web:666a7a9e7f86cb78e023fa",    
    measurementId: "G-FZ9QJM4M9E"    
  };    

  // Käynnistetään Firebase ja yhdistetään Firestoreen, luodaan muuttuja databaselle  
  const app = initializeApp(firebaseConfig);  
  const analytics = getAnalytics(app);
  const db = getFirestore(app)

// Apulistat (ja dictionary) datan väliaikaseen käsittelyyn
let kitarat = []
let bassot = []
let rummut = []
let instrumentit = {}


// Omat Luokat jokaiselle soitintyypille
class Kitara {
    constructor(valmistaja, malli, vuosi) {
    this.valmistaja = valmistaja
    this.malli = malli
    this.vuosi = vuosi
    }
}
class Basso {
    constructor(valmistaja, malli, vuosi) {
    this.valmistaja = valmistaja
    this.malli = malli
    this.vuosi = vuosi
    }
}
class Rummut {
    constructor(valmistaja, malli, vuosi) {
    this.valmistaja = valmistaja
    this.malli = malli
    this.vuosi = vuosi
    }
}

// Funktio joka tunnistaa soitinTyyppi-parametrin avulla soitintyypin ja sen perusteella luo Luokka-objektin soittimesta.
// Sen jälkeen uusi soitin pushataan omaan listaansa
function luoSoitin(soitinTyyppi, valmistaja, malli, vuosi) {
    if (soitinTyyppi === "kitara") {
        const guitar = new Kitara(valmistaja, malli, vuosi)
        kitarat.push(guitar)
    } else if (soitinTyyppi == "basso") {
        const bass = new Basso(valmistaja, malli, vuosi)
        bassot.push(bass)
    } else if (soitinTyyppi == "rummut") {
        const drums = new Rummut(valmistaja, malli, vuosi)
        rummut.push(drums)
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
        body:JSON.stringify(instrumentit)}).then(res=>{
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

// Kovakoodataan muutama instrumentti
luoSoitin("kitara", "Gibson", "Les Paul", 1952)
luoSoitin("rummut", "Pearl", "En tiedä rummuista mitään", 2018)
luoSoitin("kitara", "Fender", "Stratocaster", 1954)
luoSoitin("basso", "Ibanez", "Hevikeppi", 2012)

let test= {}
const querySnapshot = await getDocs(collection(db, "soittimet"));
querySnapshot.forEach((doc) => {
  test = {"tyyppi": doc.data()["tyyppi"],
          "malli": doc.data()["malli"],
          "valmistaja": doc.data()["valmistaja"],
          "vuosi": doc.data()["vuosi"]}
        });

luoSoitin(test["tyyppi"], test["valmistaja"], test["malli"], test["vuosi"])
export { instrumentit, luoSoitin };