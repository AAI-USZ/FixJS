function(component, attrs) {
    var _base, _ref, _ref1;
    if ((_ref = component.localRepresentation) == null) {
      component.localRepresentation = {};
    }
    if ((_ref1 = (_base = component.localRepresentation).textFormat) == null) {
      _base.textFormat = {};
    }
    component.localRepresentation.textFormat.textType = (function() {
      switch (attrs.textType) {
        case 'Double':
          return 'Numeric';
        default:
          return 'AlphaNumeric';
      }
    })();
    if (attrs.minLength != null) {
      component.localRepresentation.textFormat.minLength = +attrs.minLength;
    }
    if (attrs.maxLength != null) {
      return component.localRepresentation.textFormat.maxLength = +attrs.maxLength;
    }
  }