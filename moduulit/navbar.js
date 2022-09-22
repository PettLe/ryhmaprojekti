import kaikkiSoittimet from "./kaikkiSoittimet.js"
import lisaaSoitin from "./lisaaSoitin.js"
import etusivu from "./etusivu.js"

function NavBar() {
    // Etsitään index.html:stä tyhjä UL, luodaan yksitellen Li-muodossa linkit ja lisätään ne sitten UL:ään.
    // Jokaiseen linkkiin laitetaan myös "EventListener", joka klikatessa kutsuu muualta importattua funktiota
    let navbar = document.getElementById("navBar")
    
        let link1 = document.createElement("li")
        link1.classList.add("nav-link")
        link1.textContent = "Etusivu"
        navbar.appendChild(link1)
        link1.addEventListener("click", () => {
            etusivu()
        })

        let link2 = document.createElement("li")
        link2.classList.add("nav-link")
        link2.textContent = "Lisää soitin"
        navbar.appendChild(link2)
        link2.addEventListener("click", () => {
            lisaaSoitin()
        })

        // HUOM! Tämä vie yhä samaan paikkaan kuin "Kaikki soittimet" -linkki
        let link3 = document.createElement("li")
        link3.classList.add("nav-link")
        link3.textContent = "Hae soitinta"
        navbar.appendChild(link3)
        link3.addEventListener("click", () => {
            kaikkiSoittimet()
        })

        let link4 = document.createElement("li")
        link4.classList.add("nav-link")
        link4.textContent = "Kaikki soittimet"
        navbar.appendChild(link4)
        link4.addEventListener("click", () => {
            kaikkiSoittimet()
        })
   
}

export default NavBar