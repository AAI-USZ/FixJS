function(component, attrs) {
    var _base;
    if (component.localRepresentation == null) {
      component.localRepresentation = {};
    }
    if ((_base = component.localRepresentation).textFormat == null) {
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