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
}

// Kovakoodataan muutama instrumentti
luoSoitin("kitara", "Gibson", "Les Paul", 1952)
luoSoitin("rummut", "Pearl", "En tiedä rummuista mitään", 2018)
luoSoitin("kitara", "Fender", "Stratocaster", 1954)
luoSoitin("basso", "Ibanez", "Hevikeppi", 2012)

export { instrumentit, luoSoitin };