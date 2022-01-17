function(frame, level) {
    if (!frame.document) { return; }
    
    var links = frame.document.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
      jQuery(links[i]).unbind("click", this.listeners.writeJsonClicks, true);
      for (var z = 0; z < links[i].childNodes.length; z++) {
        jQuery(links[i].childNodes[z]).unbind("click", this.listeners.writeJsonClicks, true);
      }
    }

    this.underrideDialogs(frame);
    
    jQuery('canvas').
        unbind('click', this.listeners.writeJsonClickAt, true).
        unbind('keypress', this.listeners.writeJsonType, true);
    
    jQuery(frame.document).unbind("dblclick", this.listeners.writeJsonClicks, true);
    
    jQuery(frame.document).
        unbind("keyup", this.listeners.writeJsonChange, true).
        unbind("change", this.listeners.writeJsonChange, true);
    
    if (frame.document.designMode && frame.document.designMode.toLowerCase() == 'on') {
      jQuery(frame.document).
          unbind("keypress", this.listeners.writeJsonType, true).
          unbind("click", this.listeners.writeJsonClickAt, true);
    } else {
      jQuery(frame.document).
          unbind("click", this.listeners.writeJsonClicks, true).
          unbind("keypress", this.listeners.writeJsonKeyPress, true);
    }

    // Turn autocomplete back on. Unfortunately, this also turns on autocomplete for elements
    // that had autocomplete off in the original document. Theoretically speaking, the original
    // autocomplete value could be stored in deactivateAutocomplete and restored here, but in
    // practice, Firefox pretends to Javascript that the attribute doesn't exist! For example,
    // the line
    // <input autocomplete="off" type="text" name="email"></input></p>
    // turns into
    // <input name="email" type="text"></p>
    // when read in from jQuery.
    this.reactivateAutocomplete(frame.document.getElementsByTagName('form'));
    this.reactivateAutocomplete(frame.document.getElementsByTagName('input'));
    this.reactivateAutocomplete(frame.document.getElementsByTagName('textarea'));
  }