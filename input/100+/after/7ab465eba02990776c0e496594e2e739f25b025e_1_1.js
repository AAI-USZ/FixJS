function DV_destroyPanes() {
    let stackframes = document.getElementById("stackframes+breakpoints");
    Prefs.stackframesWidth = stackframes.getAttribute("width");

    let variables = document.getElementById("variables");
    Prefs.variablesWidth = variables.getAttribute("width");

    let bkps = document.getElementById("breakpoints");
    let frames = document.getElementById("stackframes");
    bkps.parentNode.removeChild(bkps);
    frames.parentNode.removeChild(frames);

    stackframes.parentNode.removeChild(stackframes);
    variables.parentNode.removeChild(variables);
  }