import ajastin from "./sivut/ajastin.js";
import NavBar from "./sivut/navbar.js";

NavBar()

// Etsitään HTML:stä id:n perusteella mainContent boksi. Sitten luodaan p-elementti ajastinta varten ja annetaan sille id
let mainContent = document.getElementById("mainContent")
let timerElement = document.createElement("p")
timerElement.id = "timer"

// Luodaan p-elementti ja annetaan sille Bootstrap-luokat muotoilua varten. Määritellään p-elementin teksti.
let p = document.createElement("p")
p.classList.add("lead", "my-4")
p.textContent = "Ps. tsekkaa selaimen konsoli nähdäksesi kovakoodatut soittimet"

// Lisätään ajastin ja p-elementit sivulle
mainContent.append(timerElement)
mainContent.append(p)
ajastin()