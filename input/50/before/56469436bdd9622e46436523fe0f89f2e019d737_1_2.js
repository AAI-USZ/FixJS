function DV_destroyPanes() {
    let stackframes = document.getElementById("stackframes");
    Prefs.stackframesWidth = stackframes.getAttribute("width");

    let variables = document.getElementById("variables");
    Prefs.variablesWidth = variables.getAttribute("width");
  }