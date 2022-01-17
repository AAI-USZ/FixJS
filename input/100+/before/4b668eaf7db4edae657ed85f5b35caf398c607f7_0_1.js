function applyOverlay(zone,opts) {
      log("apply Overlay on zone " + zone.attr("id"));
      zone.addClass("dropzoneTarget");
      if (jQuery.browser.mozilla && jQuery.browser.version.startsWith("1")) {
        // overlay does break drop event catching in FF 3.6 !!!
        zone.bind("dragleave",  function(event) {removeOverlay(event, null, zone, opts);});
      } else {
        // Webkit and FF4 => use Overlay
        var overlay = jQuery("<div></div>");
        overlay.addClass("dropzoneTargetOverlay");
        overlay.css(zone.position());
        overlay.width(zone.width()+2);
        overlay.height(zone.height()+2);
        zone.append(overlay);
        overlay.bind("dragleave",  function(event) { removeOverlay(event, overlay, zone, opts);});
        zone.unbind("dragenter");
        log("overlay applied");
      }
   }