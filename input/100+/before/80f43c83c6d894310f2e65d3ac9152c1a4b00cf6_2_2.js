function(parser, tag, node) {
      // has style attributes
      node.fill = 'black'
      node.stroke = 'none'
      // figure out SVG's immplied dpi
      // SVGs have user units/pixel that have an implied dpi.
      // Inkscape typically uses 90dpi, Illustrator and Intaglio use 72dpi.
      // We can use the width/height and/or viewBox attributes on the svg tag
      // and map the document neatly onto the desired dimensions.
      var w = tag.getAttribute('width');
      var h = tag.getAttribute('height');
      if (!w || !h) {
        // get size from viewBox
        var vb = tag.getAttribute('viewBox');
        if (vb) {
          var vb_parts = vb.split(',');
          if (vb_parts.length != 4) {
            vb_parts = vb.split(' ');
          }
          if (vb_parts.length == 4) {
            w = vb_parts[2];
            h = vb_parts[3];
          }
        }
      }
      if (w && h) {
        if (w.search(/cm$/i) != -1) {
          $().uxmessage('error', "Not supported: Page size in 'cm'.");
        } else if (w.search(/mm$/i) != -1) {
          $().uxmessage('error', "Not supported: Page size in 'mm'.");
        } else if (w.search(/pt$/i) != -1) {
          $().uxmessage('error', "Not supported: Page size in 'pt'.");
        } else if (w.search(/pc$/i) != -1) {
          $().uxmessage('error', "Not supported: Page size in 'pc'.");
        } else if (w.search(/in$/i) != -1) {
          $().uxmessage('error', "Not supported: Page size in 'in'.");
        }
        w = parseFloat(w.strip());
        h = parseFloat(h.strip());       
        parser.dpi = Math.round(25.4*w/parser.target_size[0]);
      }
    }