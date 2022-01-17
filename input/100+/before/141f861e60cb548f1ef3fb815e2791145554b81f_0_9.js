function(other) {
        if (!(other instanceof XMLElement)) {
          return false;
        }
        var i, j;
        if (this.name !== other.getLocalName()) { return false; }
        if (this.attributes.length !== other.getAttributeCount()) { return false; }
        // attributes may be ordered differently
        if (this.attributes.length !== other.attributes.length) { return false; }
        var attr_name, attr_ns, attr_value, attr_type, attr_other;
        for (i = 0, j = this.attributes.length; i < j; i++) {
          attr_name = this.attributes[i].getName();
          attr_ns = this.attributes[i].getNamespace();
          attr_other = other.findAttribute(attr_name, attr_ns);
          if (attr_other === null) { return false; }
          if (this.attributes[i].getValue() !== attr_other.getValue()) { return false; }
          if (this.attributes[i].getType() !== attr_other.getType()) { return false; }
        }
        // children must be ordered identically
        if (this.children.length !== other.getChildCount()) { return false; }
        if (this.children.length>0) {
          var child1, child2;
          for (i = 0, j = this.children.length; i < j; i++) {
            child1 = this.getChild(i);
            child2 = other.getChild(i);
            if (!child1.equals(child2)) { return false; }
          }
          return true;
        }
        return (this.content === other.content);
      }