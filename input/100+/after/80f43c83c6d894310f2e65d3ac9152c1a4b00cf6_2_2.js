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
          $().uxmessage('notice', "Page size in 'cm' -> setting up dpi to treat px (and no) units as 'cm'.");
          parser.dpi = 2.54
        } else if (w.search(/mm$/i) != -1) {
          $().uxmessage('notice', "Page size in 'mm' -> setting up dpi to treat px (and no) units as 'mm'.");
          parser.dpi = 25.4
        } else if (w.search(/pt$/i) != -1) {
          $().uxmessage('notice', "Page size in 'pt' -> setting up dpi to treat px (and no) units as 'pt'.");
          parser.dpi = 1.25
        } else if (w.search(/pc$/i) != -1) {
          $().uxmessage('notice', "Page size in 'pc' -> setting up dpi to treat px (and no) units as 'pc'.");
          parser.dpi = 15.0
        } else if (w.search(/in$/i) != -1) {
          $().uxmessage('notice', "Page size in 'in' -> setting up dpi to treat px (and no) units as 'in'.");
          parser.dpi = 1.0
        } else {
          // calculate scaling (dpi) from page size under the assumption the it equals the target size.
          w = parseFloat(w.strip());
          h = parseFloat(h.strip());       
          parser.dpi = Math.round(25.4*w/parser.target_size[0]);
        }
      }
    }