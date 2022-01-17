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

    this.overrideDialogs(frame);

    jQuery('canvas').
        bind('click', {}, this.listeners.writeJsonClickAt, true).
        bind('keypress', {}, this.listeners.writeJsonType, true);

    jQuery(frame.document).
        bind("dblclick", {}, this.listeners.writeJsonClicks, true).
        bind("keyup", {}, this.listeners.writeJsonChange, true).
        bind("change", {}, this.listeners.writeJsonChange, true);


    if (frame.document.designMode && frame.document.designMode.toLowerCase() == 'on') {
      jQuery(frame.document).
          bind("keypress", {}, this.listeners.writeJsonType, true).
          bind("click", {}, this.listeners.writeJsonClickAt, true);
    } else {
      jQuery(frame.document).
          bind("click", {}, this.listeners.writeJsonClicks, true).
          bind("keypress", {}, this.listeners.writeJsonKeyPress, true);
    }

    // Turn off autocomplete.
    this.deactivateAutocomplete(frame.document.getElementsByTagName('form'));
    this.deactivateAutocomplete(frame.document.getElementsByTagName('input'));
    this.deactivateAutocomplete(frame.document.getElementsByTagName('textarea'));
  }