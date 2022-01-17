function() {
      var properties        = ["width", "height"],
          propertiesLength  = properties.length,
          element           = this.element,
          adoptStyles       = function(event) {
            var target = event.target || event.srcElement,
                style  = target.style,
                i      = 0,
                property;
            
            if (target.nodeName !== "IMG") {
              return;
            }
            
            for (; i<propertiesLength; i++) {
              property = properties[i];
              if (style[property]) {
                target.setAttribute(property, parseInt(style[property], 10));
                style[property] = "";
              }
            }
            
            // After resizing IE sometimes forgets to remove the old resize handles
            wysihtml5.quirks.redraw(element);
          };
      
      this.commands.exec("enableObjectResizing", true);
      
      // IE sets inline styles after resizing objects
      // The following lines make sure that the width/height css properties
      // are copied over to the width/height attributes
      if (browser.supportsEvent("resizeend")) {
        dom.observe(element, "resizeend", adoptStyles);
      } else {
        dom.observe(element, "DOMAttrModified", adoptStyles);
      }
    }