import ajastin from "./ajastin.js"

function etusivu() {
    // Etsitään HTML:stä id:n perusteella mainContent boksi. Tyhjennetään sen innerHTML. (Muuten linkkejä klikatessa kaikki alkaa vain kasautumaan
    // peräjälkeen sivulle)
    let mainContent = document.getElementById("mainContent")
    mainContent.innerHTML = ""

    let timerElement = document.createElement("p")
    timerElement.id = "timer"

    let otsikko = document.createElement("h3")
    otsikko.textContent = "DOOMSDAY COUNTDOWN!"
    
    // Luodaan paragraph-elementti ja annetaan sille Bootstrap-luokat muotoilua varten.
    let p = document.createElement("p")
    p.classList.add("fs-3", "fw-bolder", "my-4") // fs = font size, fw = font weight, my = margin y-akselilla jne
    p.textContent = "Aikaa projektin esittelyyn:"

    let alateksti = document.createElement("p")
    alateksti.classList.add("text-wrap", "fst-italic", "fs-3")
    alateksti.textContent = "Ps. Ei hätää, hyvä tästä vielä tulee!"
    
    // Käynnistetään ajastin ja lisätään elementit sivulle mainContent-säiliöön
    ajastin()
    mainContent.appendChild(otsikko)
    mainContent.append(p)
    mainContent.append(timerElement)
    mainContent.append(alateksti)
}

export default etusivu