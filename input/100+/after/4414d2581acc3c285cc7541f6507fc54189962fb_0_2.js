function() {
        // shortcut for text and cdata nodes
        if (this.type === "TEXT") {
          return this.content;
        }

        if (this.type === "CDATA") {
          return this.cdata;
        }

        // real XMLElements
        var tagstring = this.fullName;
        var xmlstring =  "<" + tagstring;
        var a,c;

        // serialize the attributes to XML string
        for (a = 0; a<this.attributes.length; a++) {
          var attr = this.attributes[a];
          xmlstring += " "  + attr.getName() + "=" + '"' + attr.getValue() + '"';
        }

        // serialize all children to XML string
        if (this.children.length === 0) {
          if (this.content==="") {
            xmlstring += "/>";
          } else {
            xmlstring += ">" + this.content + "</"+tagstring+">";
          }
        } else {
          xmlstring += ">";
          for (c = 0; c<this.children.length; c++) {
            xmlstring += this.children[c].toString();
          }
          xmlstring += "</" + tagstring + ">";
        }
        return xmlstring;
       }