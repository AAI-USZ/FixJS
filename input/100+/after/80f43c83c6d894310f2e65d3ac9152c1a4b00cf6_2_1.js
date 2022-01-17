function(svgstring, config) {
    this.join_count = 0;
    this.boundarys = {};
    if ('optimize' in config) {
      this.optimize = config['optimize'];
    }
    this.dpi = undefined;
    
    if ('dpi' in config && config['dpi']) {
      this.dpi = config['dpi'];
      $().uxmessage('notice', "SVG import forced to "+this.dpi+"dpi.");
    } else {
      // look for clues  of svg generator app and it's DPI
      var svghead = svgstring.slice(0,400);
      if (svghead.search(/Inkscape/i) != -1) {
        this.dpi = 90;
        $().uxmessage('notice', "SVG exported with Inkscape -> 90dpi.");      
      } else if (svghead.search(/Illustrator/i) != -1) {
        this.dpi = 72;
        $().uxmessage('notice', "SVG exported with Illustrator -> 72dpi.");
      } else if (svghead.search(/Intaglio/i) != -1) {
        this.dpi = 72;
        $().uxmessage('notice', "SVG exported with Intaglio -> 72dpi.");
      } else if (svghead.search(/CorelDraw/i) != -1) {
        this.dpi = 96;
        $().uxmessage('notice', "SVG exported with CorelDraw -> 96dpi.");
      } else if (svghead.search(/Qt/i) != -1) {
        this.dpi = 90;
        $().uxmessage('notice', "SVG exported with Qt lib -> 90dpi.");
      }
    }
    
    // parse xml
    var svgRootElement;
		if (window.DOMParser) {
			var parser = new DOMParser();
			svgRootElement = parser.parseFromString(svgstring, 'text/xml').documentElement;
		}
		else {
			xml = xml.replace(/<!DOCTYPE svg[^>]*>/, '');
			var xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
			xmlDoc.async = 'false';
			xmlDoc.loadXML(svgstring); 
			svgRootElement = xmlDoc.documentElement;
		}
        
    // figure out how to map px to mm, using document page size, if necessary
    if (!this.dpi) {
      this.parseRoot(svgRootElement);
      if (this.dpi) {
        $().uxmessage('notice', "Unit conversion from page size: " + this.dpi.toFixed(4) + 'dpi');
      } else {
        $().uxmessage('warning', "Failed to use page size to infere implied px unit conversion -> defaulting to 90dpi.");
        this.dpi = 90;        
      }
    }
    
    // adjust tolerances to px units
    var mm2px = this.dpi/25.4;
    this.tolerance2 = this.tolerance*this.tolerance;
    this.tolerance2_px = (mm2px*this.tolerance)*(mm2px*this.tolerance);
    this.tolerance2_half = (0.5*this.tolerance)*(0.5*this.tolerance);
    this.epsilon = 0.1*this.tolerance;
    this.epsilon2 = this.epsilon*this.epsilon;
    
    
    // let the fun begin
    // recursively parse children
    // output will be in this.boundarys    
    var node = {}
    node.stroke = [0,0,0];
    node.xformToWorld = [1,0,0,1,0,0];    
    this.parseChildren(svgRootElement, node);
    
    // optimize and sort polylines
    if (this.optimize) {
      var totalverts = 0;
      var optiverts = 0;
      for (var col in this.boundarys) {
        var subpaths = this.boundarys[col];  // by color
        // optimize polylines with high-vertex counts
        // as many apps export highly tesselated polylines
        for (var u=0; u<subpaths.length; u++) {
          totalverts += subpaths[u].length;
          subpaths[u] = this.poly_simplify(subpaths[u], this.tolerance2_half);
          optiverts += subpaths[u].length;
        }
        // sort subpath to optimize seek distances in between
        var endpoint = [0,0];  // start at the origin
        for (var i=0; i<subpaths.length; i++) {
          if (i > 0) {
            endpoint = subpaths[i-1][subpaths[i-1].length-1];
          }
          // search the rest of array for closest subpath start point
          var d2_hash = {}  // distance2:index pairs
          for (var j=i; j<subpaths.length; j++) {
            var startpoint = subpaths[j][0];
            d2_hash[Math.pow(endpoint[0]-startpoint[0],2) + Math.pow(endpoint[1]-startpoint[1],2)] = j;
          }
          var d2min = Infinity;
          var d2minIndex = undefined;
          for (var d2 in d2_hash) {
            if (parseFloat(d2) < d2min) {
              d2min = d2; 
              d2minIndex = d2_hash[d2];
            }
          }
          // make closest subpath next item
          if (d2minIndex != i) {
            var tempItem = subpaths[i];
            subpaths[i] = subpaths[d2minIndex];
            subpaths[d2minIndex] = tempItem;  
          }
        }
      }    
      // report pseudo-polyline joining operations
      if (this.join_count > 100) {
        $().uxmessage('notice', 'SVGReader: joined many line segments: ' + this.join_count);
      } 
      // report polyline optimizations    
      var difflength = totalverts - optiverts;
      var diffpct = (100*difflength/totalverts);
      if (diffpct > 10) {  // if diff more than 10%
        $().uxmessage('notice', 'SVGReader: polylines optimized by ' + diffpct.toFixed(0) + '%');
      }
    }
    
    return this.boundarys
  }