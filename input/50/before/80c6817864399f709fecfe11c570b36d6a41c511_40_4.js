function(attrs) {
      if (componentCur.attributeRelationship == null) {
        componentCur.attributeRelationship = {};
      }
      return componentCur.attributeRelationship.primaryMeasure = attrs.id;
    }