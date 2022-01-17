function(contextEvent) {
    // Walks up the DOM tree up to maxDepth levels looking for an <A> element
    var maxDepth = 10;
    var target = contextEvent.target;
    for (var i = 0; i < maxDepth && target.nodeName != "A"; i++) {
      target = target.parentElement;
    }
    if (target.nodeName == "A") {
      Unsocialize.linkURL = target.href;
      document.getElementById("unsocialize-menu-item").hidden = "";
    } else {
      document.getElementById("unsocialize-menu-item").hidden = "true";
    }
  }