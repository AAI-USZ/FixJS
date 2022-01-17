function(component, attrs) {
    var _base, _ref, _ref1;
    if (attrs.codelist == null) {
      return;
    }
    if ((_ref = component.localRepresentation) == null) {
      component.localRepresentation = {};
    }
    component.localRepresentation.enumeration = {};
    component.localRepresentation.enumeration.ref = {};
    component.localRepresentation.enumeration.ref.id = attrs.codelist;
    component.localRepresentation.enumeration.ref.agencyID = attrs.codelistAgency != null ? attrs.codelistAgency : dsdCur.agencyID;
    if (attrs.codelistVersion != null) {
      component.localRepresentation.enumeration.ref.version = attrs.codelistVersion;
    }
    return (_ref1 = (_base = component.localRepresentation.enumeration.ref).version) != null ? _ref1 : _base.version = '1.0';
  }