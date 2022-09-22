// Apulistat (ja dictionary) datan väliaikaseen käsittelyyn
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

// Funktio joka tunnistaa instrument-parametrin avulla soitintyypin ja sen perusteella luo Luokka-objektin soittimesta.
// Sen jälkeen uusi soitin pushataan omaan listaansa
function addInstrument(instrument, brand, model, year) {
    if (instrument === "kitara") {
        const guitar = new Kitara(brand, model, year)
        kitarat.push(guitar)
    } else if (instrument == "basso") {
        const bass = new Basso(brand, model, year)
        bassot.push(bass)
    } else if (instrument == "rummut") {
        const drums = new Rummut(brand, model, year)
        rummut.push(drums)
    }

    // Instrumentit on dictionary, johon lisätään jokaisen soitintyypin omat listat
    instrumentit["kitarat"] = kitarat
    instrumentit["bassot"] = bassot
    instrumentit["rummut"] = rummut
}

// Kovakoodataan muutama instrumentti
addInstrument("kitara", "Gibson", "Les Paul", 1952)
addInstrument("rummut", "Pearl", "En tiedä rummuista mitään", 2018)
addInstrument("kitara", "Fender", "Stratocaster", 1954)
addInstrument("basso", "Ibanez", "Hevikeppi", 2012)

 
export { instrumentit, addInstrument };