import {luoSoitin} from "./handleData.js"

function lisaaSoitin() {
    // Etsitään HTML:stä id:n perusteella mainContent boksi. Tyhjennetään sen innerHTML. Luodaan Form mukamas helpottamaan elämää. (Spoiler alert, ei helpottanut.)
    let mainContent = document.getElementById("mainContent")
    mainContent.innerHTML = ""
    let form = document.createElement("form")
    form.classList.add("row")

    // Luodaan labelit ja input kentät.
    let tyyppiLabel = document.createElement("label")
    tyyppiLabel.classList.add("form-label", "lead", "fw-bolder", "my-4", "col-sm-2")
    tyyppiLabel.textContent = "Soitin:"
    tyyppiLabel.htmlFor = "tyyppi"
    
    let tyypit = ["kitara", "basso", "rummut"]
    let tyyppi = document.createElement("select")
    tyyppi.id = "tyyppi"
    tyyppi.classList.add("form-select", "form-select-lg", "mb-3", "col")
    tyyppi.id = "tyyppi";

    // luodaan vaihtoehdot dropdown menuun
    for (let i = 0; i < tyypit.length; i++) {
        let valinta = document.createElement("option");
        valinta.value = tyypit[i];
        valinta.text = tyypit[i];
        tyyppi.appendChild(valinta);
    }
    
    // Luodaan jokaiselle label + input -parille oma div johon ne sijoitetaan. Tämä auttaa pitämään kaiken siististi kasassa sivulla.
    let tyyppiDiv = document.createElement("div")
    tyyppiDiv.classList.add("row")
    tyyppiDiv.appendChild(tyyppiLabel)
    tyyppiDiv.appendChild(tyyppi)

    // Rinse and repeat
    let brandLabel = document.createElement("label")
    brandLabel.classList.add("form-label", "lead", "fw-bolder", "my-4", "col-sm-2")
    brandLabel.textContent = "Valmistaja:"

    let brand = document.createElement("input")
    brand.type = "text"
    brand.classList.add("form-control", "mb-3", "col")
    brand.placeholder = "Gibson"

    let brandDiv = document.createElement("div")
    brandDiv.classList.add("row")
    brandDiv.appendChild(brandLabel)
    brandDiv.appendChild(brand)

    let modelLabel = document.createElement("label")
    modelLabel.classList.add("form-label", "lead", "fw-bolder", "my-4", "col-sm-2")
    modelLabel.textContent = "Malli:"

    let model = document.createElement("input")
    model.type = "text"
    model.classList.add("form-control", "mb-3", "col")
    model.placeholder = "Eeppinen vehje"

    let modelDiv = document.createElement("div")
    modelDiv.classList.add("row")
    modelDiv.appendChild(modelLabel)
    modelDiv.appendChild(model)

    let yearLabel = document.createElement("label")
    yearLabel.classList.add("form-label", "lead", "fw-bolder", "my-4", "col-sm-2")
    yearLabel.textContent = "Valmistusvuosi:"

    let year = document.createElement("input")
    year.type = "text"
    year.classList.add("form-control", "mb-3", "col")
    year.placeholder = "2000"

    let yearDiv = document.createElement("div")
    yearDiv.classList.add("row")
    yearDiv.appendChild(yearLabel)
    yearDiv.appendChild(year)


    let submitBtn = document.createElement("button")
    submitBtn.type = "button"
    submitBtn.textContent = "Lisää tietokantaan"
    submitBtn.classList.add("btn", "btn-dark", "w-50", "position-absolute", "top-100", "start-50", "translate-middle", "mt-5")
    let submitDiv = document.createElement("div")
    submitDiv.classList.add("row", "position-relative")
    submitDiv.appendChild(submitBtn)
    
    // Submit-nappulaa painaessa kerätään tiedot .valuen avulla jokaisesta kentästä. Jos jokainen kenttä on täytetty niin
    // niin kutsutaan luoSoitin-funktiota lisäämään tiedot tietokantaan. Sen jälkeen nollataan Form.
    submitBtn.addEventListener("click", () => {
        let tyyppiInfo = tyyppi.value
        let brandInfo = brand.value
        let modelInfo = model.value
        let yearInfo = year.value
        
        if (brandInfo.length > 1 && modelInfo.length > 1 && yearInfo.length == 4) {
            luoSoitin(tyyppiInfo, brandInfo, modelInfo, yearInfo)
            form.reset();
        }
    })

    // Lisätään jokainen label + input -div ja submit button Formiin. Sen jälkeen koko Form lisätään jälleen mainContentiin.
    form.appendChild(tyyppiDiv);
    form.appendChild(brandDiv)
    form.appendChild(modelDiv)
    form.appendChild(yearDiv)
    form.appendChild(submitDiv)

    mainContent.appendChild(form)
}

export default lisaaSoitin