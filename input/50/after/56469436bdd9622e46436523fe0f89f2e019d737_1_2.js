function DV_destroyPanes() {
    let stackframes = document.getElementById("stackframes+breakpoints");
    Prefs.stackframesWidth = stackframes.getAttribute("width");

    let variables = document.getElementById("variables");
    Prefs.variablesWidth = variables.getAttribute("width");
  }