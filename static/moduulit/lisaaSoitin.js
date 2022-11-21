import {luoSoitin} from "./handleData.js"

function lisaaSoitin() {
    // Etsitään HTML:stä id:n perusteella mainContent boksi. Tyhjennetään sen innerHTML. Luodaan Form mukamas helpottamaan elämää. (Spoiler alert, ei helpottanut.)
    let mainContent = document.getElementById("mainContent")
    mainContent.innerHTML = ""
    let form = document.createElement("form")
    form.method = "POST"
    form.action = "data"
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
	// submitBtn.onclick = "tulostaInfo()"	// <-- Käyttäjälle tulostus ilm.
    submitBtn.textContent = "Lisää tietokantaan"
    submitBtn.classList.add("btn", "btn-dark", "w-50", "position-relative", "top-25", "start-50", "translate-middle", "mt-5")
    let submitDiv = document.createElement("div")
    submitDiv.classList.add("row", "position-relative")
    submitDiv.appendChild(submitBtn)
	// ------------------------------------------
	
	let output = document.createElement("p")
	output.id = "testi"
	output.type = "text"
	output.textContent = ""
	// output.onclick = "tulostaInfo()"
	output.classList.add("position-absolute", "mb-50", "top-100", "start-25", "fs-3", "fw-bolder", "my-4")
	
	
	let infoDiv = document.createElement("div")
	infoDiv.classList.add("row")
	// infoDiv.appendChild(output)
	submitDiv.appendChild(output)
	
    // submitDiv.appendChild(output)
 	// console.log(mainContent.childNodes);

 	// console.log(mainContent.previousSibling);
 	// console.log(mainContent.nextSibling);
	// Käyttäjälle tuotteen tulostus
	function tulostaInfo() {
		let tyyppiInfo = " " + tyyppi.value;
		let brandInfo = ", Valmistaja: " + brand.value;
		let modelInfo = ", Malli: " + model.value;
		let yearInfo = ", Vuosimalli: " + year.value;
		let tulostus = "Lisäsit soittimen: " + tyyppiInfo + brandInfo + modelInfo + yearInfo;
		output.textContent = tulostus;
		// document.getElementById("testi").textContent = tulostus;
	}

	
	// ---------------------------------------------

    // Submit-nappulaa painaessa kerätään tiedot .valuen avulla jokaisesta kentästä. Jos jokainen kenttä on täytetty niin
    // niin kutsutaan luoSoitin-funktiota lisäämään tiedot tietokantaan. Sen jälkeen nollataan Form.
    submitBtn.addEventListener("click", () => {
		let tyyppiInfo = tyyppi.value
        let brandInfo = brand.value
        let modelInfo = model.value
        let yearInfo = year.value
        
        //.submit() pitäisi lähettää form-data Flaskille method="POST" kautta. ei toimi.
        // form.submit()
        if (brandInfo.length > 1 && modelInfo.length > 1 && yearInfo.length == 4) {
			luoSoitin(tyyppiInfo, brandInfo, modelInfo, yearInfo)
			tulostaInfo();
            form.reset();
			// alert("Loit soittimen: " + tyyppiInfo + ", Valmistaja: " + brandInfo + ", Malli: " + modelInfo + ", Vuosimalli: " + yearInfo);
			// tulostusInfo(tyyppiInfo, brandInfo, modelInfo, yearInfo)
        }
		
		})
		// console.log("Soitin: " + tyyppi.value);
		// console.log(FormData.classList.contains("form-control"));

    // Lisätään jokainen label + input -div ja submit button Formiin. Sen jälkeen koko Form lisätään jälleen mainContentiin.
    form.appendChild(tyyppiDiv);
    form.appendChild(brandDiv)
    form.appendChild(modelDiv)
    form.appendChild(yearDiv)
    form.appendChild(submitDiv)
    // form.appendChild(infoDiv)

    mainContent.appendChild(form)
    mainContent.appendChild(infoDiv)
    // mainContent.append(form)

}
export {lisaaSoitin};