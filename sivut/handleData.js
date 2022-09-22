// Apulistat datan väliaikaseen käsittelyyn
let kitarat = []
let bassot = []
let rummut = []
let instrumentit = {}


// Omat Luokat jokaiselle soitintyypille
class Kitara {
    constructor(brand, model, year) {
    this.brand = brand
    this.model = model
    this.year = year
    }
}
class Basso {
    constructor(brand, model, year) {
    this.brand = brand
    this.model = model
    this.year = year
    }
}
class Rummut {
    constructor(brand, model, year) {
    this.brand = brand
    this.model = model
    this.year = year
    }
}

// Funktio joka tunnistaa instrument-parametrin avulla soitintyypin ja sen perusteella luo Objektin soittimesta.
// Sen jälkeen uusi soitin pushataan omaan listaansa
function addInstrument(instrument, brand, model, year) {
    if (instrument === "guitar") {
        const guitar = new Kitara(brand, model, year)
        kitarat.push(guitar)
    } else if (instrument == "bass") {
        const bass = new Basso(brand, model, year)
        bassot.push(bass)
    } else if (instrument == "drums") {
        const drums = new Rummut(brand, model, year)
        rummut.push(drums)
    }

    // Instrumentit on sanakirja/objekti, johon lisätään jokaisen soitintyypin omat listat
    instrumentit["kitarat"] = kitarat
    instrumentit["bassot"] = bassot
    instrumentit["rummut"] = rummut
}

// Kovakoodataan muutama instrumentti
addInstrument("guitar", "Gibson", "Les Paul", 1969)
addInstrument("drums", "Pearl", "En tiedä rummuista mitään", 2018)
addInstrument("guitar", "Fender", "Stratocaster", 1971)
addInstrument("bass", "Ibanez", "Hevikeppi", 2012)


// Kahden for loopin avulla tulostetaan consoleen instrumentit
function logDataTest() {
    for (const [key, value] of Object.entries(instrumentit)) {
        for (const x in value) {
            console.log("Instrumentti:", instrumentit[key][x].brand, instrumentit[key][x].model + ",", "Valmistusvuosi:", instrumentit[key][x].year)
        }
    }
} 
export { instrumentit, logDataTest };