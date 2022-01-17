function(frame, level) {
    // Remember that this frame has been bound to.
    this.bound.push(frame);
    
    // Turns out there are cases where people are canceling click on purpose, so I am manually
    // going to attach click listeners to all links.
    var links = frame.document.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
      jQuery(links[i]).bind("click", {}, this.listeners.writeJsonClicks, true);
      for (var z = 0; z < links[i].childNodes.length; z++) {
        jQuery(links[i].childNodes[z]).bind("click", {}, this.listeners.writeJsonClicks, true);
      }
    }

    this.overrideDialogs(frame.document);

    jQuery('canvas', frame.document).
        bind('click', {}, this.listeners.writeJsonClickAt, true).
        bind('keypress', {}, this.listeners.writeJsonType, true);
    
    frame.document.addEventListener("dblclick", this.listeners.writeJsonClicks, true);
    frame.document.addEventListener("change", this.listeners.writeJsonChange, true);    
    frame.document.addEventListener("keyup", this.listeners.writeJsonChange, true);

    if (frame.document.designMode && frame.document.designMode.toLowerCase() == 'on') {
      jQuery(frame.document).
          bind("keypress", {}, this.listeners.writeJsonType, true).
          bind("click", {}, this.listeners.writeJsonClickAt, true);
    } else {
      frame.document.addEventListener("click", this.listeners.writeJsonClicks, true);
      //frame.document.addEventListener("keypress", this.listeners.writeJsonKeyPress, true); qqDPS
    }

    // Turn off autocomplete.
    this.deactivateAutocomplete(frame.document.getElementsByTagName('form'));
    this.deactivateAutocomplete(frame.document.getElementsByTagName('input'));
    this.deactivateAutocomplete(frame.document.getElementsByTagName('textarea'));
  }