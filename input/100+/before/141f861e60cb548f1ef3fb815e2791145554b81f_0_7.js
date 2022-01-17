function() {
      this.attributes = [];
      this.children   = [];
      this.fullName   = null;
      this.name       = null;
      this.namespace  = "";
      this.content = null;
      this.parent    = null;
      this.lineNr     = "";
      this.systemID   = "";
      this.type = "ELEMENT";

      if (arguments.length === 4) {
        this.fullName   = arguments[0] || "";
        if (arguments[1]) {
          this.name = arguments[1];
        } else {
          var index = this.fullName.indexOf(':');
          if (index >= 0) {
            this.name = this.fullName.substring(index + 1);
          } else {
            this.name = this.fullName;
          }
        }
        this.namespace = arguments[1];
        this.lineNr    = arguments[3];
        this.systemID  = arguments[2];
      }
      else if ((arguments.length === 2 && arguments[1].indexOf(".") > -1) ) {
        // filename or svg xml element
        this.parse(arguments[arguments.length -1]);
      } else if (arguments.length === 1 && typeof arguments[0] === "string"){
        this.parse(arguments[0]);
      }
    }