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
    if (soitinTyyppi === "kitara") {
        const guitar = new Kitara(valmistaja, malli, vuosi, xid)
        kitarat.push(guitar)
    } else if (soitinTyyppi == "basso") {
        const bass = new Basso(valmistaja, malli, vuosi, xid)
        bassot.push(bass)
    } else if (soitinTyyppi == "rummut") {
        const drums = new Rummut(valmistaja, malli, vuosi, xid)
        rummut.push(drums)
    }
    
    handleDocs(soitinTyyppi, valmistaja, malli, vuosi, uniqueID())

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

async function poistaSoitin(event) {
    let uid = event.srcElement.id
    let poistettava
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
            }
           }
           }  
           let mainContent = document.getElementById("mainContent")
           mainContent.innerHTML = ""
        //    instrumentit = {}
        //    taytaInstrumentit()
           kaikkiSoittimet()
}

// Luetaan tiedot databasesta asynkronisella funktiolla (odotetaan vastausta ennen etenemistä) ja täytetään instrumentit-dictionary niillä
async function taytaInstrumentit() {
    // instrumentit = {}
const querySnapshot = await getDocs(collection(db, "soittimet"));
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

instrumentit["kitarat"] = kitarat
instrumentit["bassot"] = bassot
instrumentit["rummut"] = rummut
        });}
    taytaInstrumentit()

export { instrumentit, luoSoitin, poistaSoitin };