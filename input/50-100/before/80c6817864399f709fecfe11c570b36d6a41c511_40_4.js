function(attrs) {
      var _base;
      if (componentCur.attributeRelationship == null) {
        componentCur.attributeRelationship = {};
      }
      if ((_base = componentCur.attributeRelationship).dimension == null) {
        _base.dimension = [];
      }
      return componentCur.attributeRelationship.dimension.push(attrs.id);
    }