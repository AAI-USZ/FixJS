function DV_initializePanes() {
    let stackframes = document.getElementById("stackframes");
    stackframes.setAttribute("width", Prefs.stackframesWidth);

    let variables = document.getElementById("variables");
    variables.setAttribute("width", Prefs.variablesWidth);
  }