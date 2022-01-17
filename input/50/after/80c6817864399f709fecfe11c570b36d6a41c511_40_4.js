function(attrs) {
      var _ref;
      if ((_ref = componentCur.attributeRelationship) == null) {
        componentCur.attributeRelationship = {};
      }
      return componentCur.attributeRelationship.primaryMeasure = attrs.id;
    }