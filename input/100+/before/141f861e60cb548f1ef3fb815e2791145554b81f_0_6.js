function() {
      p.PShape.call( this ); // PShape is the base class.
      if (arguments.length === 1) { //xml element coming in
        this.element  = arguments[0] ;//new p.XMLElement(null, arguments[0]);
        // set values to their defaults according to the SVG spec
        this.vertexCodes         = [];
        this.vertices            = [];
        this.opacity             = 1;

        this.stroke              = false;
        this.strokeColor         = PConstants.ALPHA_MASK;
        this.strokeWeight        = 1;
        this.strokeCap           = PConstants.SQUARE;  // BUTT in svg spec
        this.strokeJoin          = PConstants.MITER;
        this.strokeGradient      = null;
        this.strokeGradientPaint = null;
        this.strokeName          = null;
        this.strokeOpacity       = 1;

        this.fill                = true;
        this.fillColor           = PConstants.ALPHA_MASK;
        this.fillGradient        = null;
        this.fillGradientPaint   = null;
        this.fillName            = null;
        this.fillOpacity         = 1;

        if (this.element.getName() !== "svg") {
          throw("root is not <svg>, it's <" + this.element.getName() + ">");
        }
      }
      else if (arguments.length === 2) {
        if (typeof arguments[1] === 'string') {
          if (arguments[1].indexOf(".svg") > -1) { //its a filename
            this.element = new p.XMLElement(null, arguments[1]);
            // set values to their defaults according to the SVG spec
            this.vertexCodes         = [];
            this.vertices            = [];
            this.opacity             = 1;

            this.stroke              = false;
            this.strokeColor         = PConstants.ALPHA_MASK;
            this.strokeWeight        = 1;
            this.strokeCap           = PConstants.SQUARE;  // BUTT in svg spec
            this.strokeJoin          = PConstants.MITER;
            this.strokeGradient      = "";
            this.strokeGradientPaint = "";
            this.strokeName          = "";
            this.strokeOpacity       = 1;

            this.fill                = true;
            this.fillColor           = PConstants.ALPHA_MASK;
            this.fillGradient        = null;
            this.fillGradientPaint   = null;
            this.fillOpacity         = 1;

          }
        } else { // XMLElement
          if (arguments[0]) { // PShapeSVG
            this.element             = arguments[1];
            this.vertexCodes         = arguments[0].vertexCodes.slice();
            this.vertices            = arguments[0].vertices.slice();

            this.stroke              = arguments[0].stroke;
            this.strokeColor         = arguments[0].strokeColor;
            this.strokeWeight        = arguments[0].strokeWeight;
            this.strokeCap           = arguments[0].strokeCap;
            this.strokeJoin          = arguments[0].strokeJoin;
            this.strokeGradient      = arguments[0].strokeGradient;
            this.strokeGradientPaint = arguments[0].strokeGradientPaint;
            this.strokeName          = arguments[0].strokeName;

            this.fill                = arguments[0].fill;
            this.fillColor           = arguments[0].fillColor;
            this.fillGradient        = arguments[0].fillGradient;
            this.fillGradientPaint   = arguments[0].fillGradientPaint;
            this.fillName            = arguments[0].fillName;
            this.strokeOpacity       = arguments[0].strokeOpacity;
            this.fillOpacity         = arguments[0].fillOpacity;
            this.opacity             = arguments[0].opacity;
          }
        }
      }

      this.name      = this.element.getStringAttribute("id");
      var displayStr = this.element.getStringAttribute("display", "inline");
      this.visible   = displayStr !== "none";
      var str = this.element.getAttribute("transform");
      if (str) {
        this.matrix = this.parseMatrix(str);
      }
      // not proper parsing of the viewBox, but will cover us for cases where
      // the width and height of the object is not specified
      var viewBoxStr = this.element.getStringAttribute("viewBox");
      if ( viewBoxStr !== null ) {
        var viewBox = viewBoxStr.split(" ");
        this.width  = viewBox[2];
        this.height = viewBox[3];
      }

      // TODO if viewbox is not same as width/height, then use it to scale
      // the original objects. for now, viewbox only used when width/height
      // are empty values (which by the spec means w/h of "100%"
      var unitWidth  = this.element.getStringAttribute("width");
      var unitHeight = this.element.getStringAttribute("height");
      if (unitWidth !== null) {
        this.width  = this.parseUnitSize(unitWidth);
        this.height = this.parseUnitSize(unitHeight);
      } else {
        if ((this.width === 0) || (this.height === 0)) {
          // For the spec, the default is 100% and 100%. For purposes
          // here, insert a dummy value because this is prolly just a
          // font or something for which the w/h doesn't matter.
          this.width  = 1;
          this.height = 1;

          //show warning
          throw("The width and/or height is not " +
                "readable in the <svg> tag of this file.");
        }
      }
      this.parseColors(this.element);
      this.parseChildren(this.element);

    }