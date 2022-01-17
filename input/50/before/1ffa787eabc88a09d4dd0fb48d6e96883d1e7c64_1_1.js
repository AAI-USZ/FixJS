function showText(sourceNode) {
    document.getElementById("text").textSource = sourceNode;
    hideText();
    setTimeout("showText_intermission()", 425);
}