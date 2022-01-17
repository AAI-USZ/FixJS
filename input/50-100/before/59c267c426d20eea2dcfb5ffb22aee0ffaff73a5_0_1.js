function(contextEvent) {
    if (contextEvent.target.tagName == "A") {
      Unsocialize.linkURL = contextEvent.target.href;
      document.getElementById("unsocialize-menu-item").hidden = "";

    } else if (contextEvent.target.tagName == "SPAN" &&
               contextEvent.target.parentElement.tagName == "A") {
      // Sometimes there will be a span wrapped in an <A> element.
      Unsocialize.linkURL = contextEvent.target.parentElement.href;
      document.getElementById("unsocialize-menu-item").hidden = "";

    } else {
      document.getElementById("unsocialize-menu-item").hidden = "true";
    }
  }