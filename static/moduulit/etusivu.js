function etusivu() {
    // Etsitään HTML:stä id:n perusteella mainContent boksi. Tyhjennetään sen innerHTML. (Muuten linkkejä klikatessa kaikki alkaa vain kasautumaan
    // peräjälkeen sivulle)
    let mainContent = document.getElementById("mainContent")
    mainContent.innerHTML = ""

    // Luodaan paragraph-elementti ja annetaan sille Bootstrap-luokat muotoilua varten.
    let otsikko = document.createElement("p")
    otsikko.classList.add("fs-3", "fw-bolder", "my-4") // fs = font size, fw = font weight, my = margin y-akselilla jne
    otsikko.textContent = "Soitintietokanta - esimerkiksi keikkapaikalle!"

    let kuvaus = document.createElement("h3")
    kuvaus.textContent = "Tämä projekti on tietokanta, jonne esimerkiksi keikkapaikka tai orkesteri voi listata ja katalogisoida varastosta löytyvät instrumenttinsa."

    let alateksti = document.createElement("p")
    alateksti.classList.add("text-wrap", "fst-italic", "fs-3")
    alateksti.textContent = "Ps. Ei hätää, hyvä tästä vielä tulee!"
    
    // Käynnistetään ajastin ja lisätään elementit sivulle mainContent-säiliöön
    mainContent.append(otsikko)
    mainContent.appendChild(kuvaus)
    mainContent.append(alateksti)
}

export { etusivu }