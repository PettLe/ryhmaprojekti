import logDataTest from "./sivut/handleData.js";

logDataTest()

// Etsitään HTML:stä id:n perusteella mainContent boksi. Sitten luodaan p-elementti ajastinta varten ja annetaan sille id
let mainContent = document.getElementById("mainContent")
let timerElement = document.createElement("p")
timerElement.id = "timer"

// Luodaan p-elementti ja annetaan sille Bootstrap-luokat muotoilua varten. Määritellään p-elementin teksti.
let p = document.createElement("p")
p.classList.add("lead", "my-4")
p.textContent = "Ps. tsekkaa selaimen konsoli nähdäksesi kovakoodatut soittimet"

// Ajastin
var countDownDate = new Date("Nov 21, 2022 08:00:00").getTime();

// Päivitetään sekunnin välein
var x = setInterval(function () {
  var now = new Date().getTime();
  var distance = countDownDate - now;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const timer = document.getElementById("timer");
  timer.innerHTML =
    days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("timer").innerHTML =
      "OH NO!!!";
  }
}, 1000);

// Lisätään ajastin ja p-elementit sivulle
mainContent.append(timerElement)
mainContent.append(p)