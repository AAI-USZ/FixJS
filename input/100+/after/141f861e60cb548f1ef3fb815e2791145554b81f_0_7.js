function(selector, uri, sysid, line) {
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

      if (selector) {
        if (typeof selector === "string") {
          if (uri === undef && selector.indexOf("<")>-1) {
            // load XML from text string
            this.parse(selector);
          } else {
            // XMLElement(fullname, namespace, sysid, line) format
            this.fullName = selector;
            this.namespace = uri;
            this.systemId = sysid;
            this.lineNr = line;
          }
        } else {
          // XMLElement(this,file) format
          this.parse(uri);
        }
      }
    }