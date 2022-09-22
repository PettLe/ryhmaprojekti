function lisaaSoitin() {
    let mainContent = document.getElementById("mainContent")
    mainContent.innerHTML = ""
    let form = document.createElement("form")
    form.classList.add("row")


    let tyyppiLabel = document.createElement("label")
    tyyppiLabel.classList.add("form-label", "lead", "my-4")
    tyyppiLabel.textContent = "Soitin:"
    tyyppiLabel.htmlFor = "tyyppi"

    let tyypit = ["kitara", "basso", "rummut"]
    let tyyppi = document.createElement("select")
    tyyppi.id = "tyyppi"
    tyyppi.classList.add("form-select", "form-select-lg", "mb-3")
    tyyppi.id = "tyyppi";

    let brandLabel = document.createElement("label")
    brandLabel.classList.add("form-label", "lead", "my-4")
    brandLabel.textContent = "Valmistaja:"

    let brand = document.createElement("input")
    brand.type = "text"
    brand.classList.add("form-control", "mb-3")
    brand.placeholder = "Valmistaja"

    let modelLabel = document.createElement("label")
    modelLabel.classList.add("form-label", "lead", "my-4")
    modelLabel.textContent = "Malli:"

    let model = document.createElement("input")
    model.type = "text"
    model.classList.add("form-control", "mb-3")
    model.placeholder = "Malli"

    let yearLabel = document.createElement("label")
    yearLabel.classList.add("form-label", "lead", "my-4")
    yearLabel.textContent = "Valmistusvuosi:"

    let year = document.createElement("input")
    year.type = "text"
    year.classList.add("form-control", "mb-3")
    year.placeholder = "Valmistusvuosi"

    let submitBtn = document.createElement("button")
    submitBtn.type = "submit"
    submitBtn.textContent = "Lisää tietokantaan"
    submitBtn.classList.add("btn", "btn-dark", "w-50")

    // form.appendChild(tyyppiLabel)
    form.appendChild(tyyppi);
    // form.appendChild(brandLabel)
    form.appendChild(brand)
    // form.appendChild(modelLabel)
    form.appendChild(model)
    // form.appendChild(yearLabel)
    form.appendChild(year)
    form.appendChild(submitBtn)

    for (let i = 0; i < tyypit.length; i++) {
        let valinta = document.createElement("option");
        valinta.value = tyypit[i];
        valinta.text = tyypit[i];
        tyyppi.appendChild(valinta);
    }
    mainContent.appendChild(form)
}

export default lisaaSoitin