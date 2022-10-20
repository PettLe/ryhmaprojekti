// Importataan CDN:n avulla tarvittavia FireBase-toimintoja
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";    
import { getFirestore, collection, doc, addDoc, serverTimestamp, getDocs, deleteDoc } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js'
import { kaikkiSoittimet } from "./kaikkiSoittimet.js";

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
  const db = getFirestore(app)

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
    constructor(valmistaja, malli, vuosi, xid) {
    this.valmistaja = valmistaja
    this.malli = malli
    this.vuosi = vuosi
    this.xid = xid
    }
}
class Basso {
    constructor(valmistaja, malli, vuosi, xid) {
    this.valmistaja = valmistaja
    this.malli = malli
    this.vuosi = vuosi
    this.xid = xid
    }
}
class Rummut {
    constructor(valmistaja, malli, vuosi, xid) {
    this.valmistaja = valmistaja
    this.malli = malli
    this.vuosi = vuosi
    this.xid = xid
    }
}

// funktio, joka kutsuu firestore databasea ja sen jälkeen lisää sinne soittimen.
const handleDocs = async function (tyyppi, valmistaja, malli, vuosi, xid) {
    const docRef = await addDoc(collection(db, "soittimet"), {
      tyyppi: tyyppi,
      valmistaja: valmistaja,
      malli: malli,
      vuosi: vuosi,
      time: serverTimestamp(),
      xid: xid
    });
  };


// Funktio joka tunnistaa soitinTyyppi-parametrin avulla soitintyypin ja sen perusteella luo Luokka-objektin soittimesta.
// Sen jälkeen uusi soitin pushataan omaan listaansa
function luoSoitin(soitinTyyppi, valmistaja, malli, vuosi, xid) {
// kun uusi soitin luodaan muualla, kutsutaan yllä luotua funktiota joka lähettää tiedot databaseen
   handleDocs(soitinTyyppi, valmistaja, malli, vuosi, uniqueID())

// sen jälkeen kutsutaan funktiota, joka hakee ajantasaiset tiedot databasesta ja täyttää sovelluksen omassa käytössä 
// olevan instrumentit-dictionaryn niillä
    taytaInstrumentit()

            
    // Lähettää instrumentit-arrayn Flaskille ja Pythonin käytettäväksi
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

// Funktio yksittäisen soittimen poistoa varten
async function poistaSoitin(event) {
// Kun soittimet renderöidään kaikkiSoittimet-tiedostossa, samalla jokaisen poistonapin ID:ksi määritellään kyseisen instrumentin yksilöllinen ID.
// Alla oleva muuttuja saa arvokseen klikkaus-eventin tapahtuessa klikatun elementin (eli poistonappulan) ID:n.
    let uid = event.srcElement.id
    let poistettava
// Seuraavaksi selaamme läpi instrumentit dictionaryn että databasen. Jos aiemmin löydetylle ID:lle löydetään match, löydetty soitin poistetaan. 
        for(let avain in instrumentit){
           let obj = instrumentit[avain];
           for (let soitin in obj) {
            if (obj[soitin].xid == uid) {
                let tiedot = await getDocs(collection(db, "soittimet"));
                tiedot.forEach((doc) => {
                    if (doc.data().xid == uid) {
                    poistettava = doc.id
                }
            });
                const docRef = doc(db, "soittimet", poistettava);
                deleteDoc(docRef);
                instrumentit[avain] = obj.filter(function(el) { return el.xid != uid; });
                console.log(instrumentit)
                break;
            }}}  
           let mainContent = document.getElementById("mainContent")
           mainContent.innerHTML = ""
           kaikkiSoittimet()
}

// Luetaan tiedot databasesta asynkronisella funktiolla (=> eli odotetaan vastausta ennen etenemistä) ja täytetään instrumentit-dictionary niillä
async function taytaInstrumentit() {
// tyhjennetään yksittäiset soitinlistat aina funktiota kutsuttaessa, jottei samat soittimet esiinny useasti
    kitarat = []
    bassot = []
    rummut = []

// querySnapshot hakee haluamamme databasen, jonka jälkeen voimme loopata läpi jokaisen sieltä löytyneen objektin
const querySnapshot = await getDocs(collection(db, "soittimet"));

// jokaisen objektin kohdalla tarkistamme onko kyseessä mikä soitin, ja sen perusteella luomme Class-objektin siitä ja laitamme omaan
// soitintyypille varattuun arrayhin.
querySnapshot.forEach((doc) => {
    if (doc.data()["tyyppi"] === "kitara") {
        const guitar = new Kitara(doc.data()["valmistaja"], doc.data()["malli"], doc.data()["vuosi"], doc.data()["xid"])
        kitarat.push(guitar)
    } else if (doc.data()["tyyppi"] == "basso") {
        const bass = new Basso(doc.data()["valmistaja"], doc.data()["malli"], doc.data()["vuosi"], doc.data()["xid"])
        bassot.push(bass)
    } else if (doc.data()["tyyppi"] == "rummut") {
        const drums = new Rummut(doc.data()["valmistaja"], doc.data()["malli"], doc.data()["vuosi"], doc.data()["xid"])
        rummut.push(drums)
    }

// Nyt täytämme instrumentit-dictionaryn jokaisen soitintyypin arraylla.
instrumentit["kitarat"] = kitarat
instrumentit["bassot"] = bassot
instrumentit["rummut"] = rummut
        });}

taytaInstrumentit()

export { instrumentit, luoSoitin, poistaSoitin, taytaInstrumentit };

// Huom., valmis instrumentti array on muodoltaan kutakuinkin tällainen:
// instrumentit = {
//          "kitarat": [{"valmistaja": "gibson", "malli": "les paul"}, {"valmistaja": "fender", "malli": "telecaster"}] (<-- lista, jonka sisällä objekteja) 
//              },
//              {
//              "bassot": [{"valmistaja": "ibanez", "malli": "jöhrmungad"}]    
//                      }, jne.