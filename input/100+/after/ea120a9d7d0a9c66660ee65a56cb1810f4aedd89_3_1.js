function dbgLoaded() {
      frame.removeEventListener("Debugger:Loaded", dbgLoaded, true);

      ok(content.Prefs.stackframesWidth,
        "The debugger preferences should have a saved stackframesWidth value.");
      ok(content.Prefs.variablesWidth,
        "The debugger preferences should have a saved variablesWidth value.");

      stackframes = content.document.getElementById("stackframes+breakpoints");
      variables = content.document.getElementById("variables");

      is(content.Prefs.stackframesWidth, stackframes.getAttribute("width"),
        "The stackframes pane width should be the same as the preferred value.");
      is(content.Prefs.variablesWidth, variables.getAttribute("width"),
        "The variables pane width should be the same as the preferred value.");

      stackframes.setAttribute("width", someWidth1);
      variables.setAttribute("width", someWidth2);

      removeTab(tab1);

    }