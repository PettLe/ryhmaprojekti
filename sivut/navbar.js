import kaikkiSoittimet from "./kaikkiSoittimet.js"
import lisaaSoitin from "./lisaaSoitin.js"

function NavBar() {
    let navbar = document.getElementById("navBar")
    
        let link1 = document.createElement("li")
        link1.classList.add("nav-link")
        link1.textContent = "Etusivu"
        navbar.appendChild(link1)
        link1.addEventListener("click", () => {
            window.location.reload();
        })

        let link2 = document.createElement("li")
        link2.classList.add("nav-link")
        link2.textContent = "Lisää soitin"
        navbar.appendChild(link2)
        link2.addEventListener("click", () => {
            lisaaSoitin()
        })

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