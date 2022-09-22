function ajastin() {
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
        timer.classList.add("fs-3", "fw-semibold")
        timer.innerHTML =
        days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
        
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("timer").innerHTML =
            "OH NO!!!";
        }
    }, 1000);
}

export default ajastin;