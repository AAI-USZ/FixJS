function DV_initializePanes() {
    let stackframes = document.getElementById("stackframes+breakpoints");
    stackframes.setAttribute("width", Prefs.stackframesWidth);

    let variables = document.getElementById("variables");
    variables.setAttribute("width", Prefs.variablesWidth);
  }