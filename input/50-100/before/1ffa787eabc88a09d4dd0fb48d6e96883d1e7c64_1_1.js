function hideText_step() {
    //alert(document.getElementById("hauptText").childNodes[1].style.opacity);
    var opac = parseFloat(document.getElementById("text").style.opacity);
    document.getElementById("text").style.opacity = "" + (opac - 0.11);
    if (opac >= 0.01) {
        setTimeout("hideText_step()", 25);
    } else {
        document.getElementById("text").childNodes[i].style.display = "none";
    }
}