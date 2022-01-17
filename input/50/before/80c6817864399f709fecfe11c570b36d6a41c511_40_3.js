function(attrs) {
      if (componentCur.attributeRelationship == null) {
        componentCur.attributeRelationship = {};
      }
      return componentCur.attributeRelationship.group = attrs.id;
    }