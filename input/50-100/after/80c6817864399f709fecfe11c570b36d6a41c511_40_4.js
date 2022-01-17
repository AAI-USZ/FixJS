function(attrs) {
      var _base, _ref, _ref1;
      if ((_ref = componentCur.attributeRelationship) == null) {
        componentCur.attributeRelationship = {};
      }
      if ((_ref1 = (_base = componentCur.attributeRelationship).dimension) == null) {
        _base.dimension = [];
      }
      return componentCur.attributeRelationship.dimension.push(attrs.id);
    }