function(attrs) {
      if (comp.attributeRelationship == null) {
        comp.attributeRelationship = {};
      }
      return comp.attributeRelationship.group = this.stringBuffer;
    }