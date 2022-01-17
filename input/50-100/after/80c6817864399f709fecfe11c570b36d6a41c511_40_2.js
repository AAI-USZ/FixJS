function(attrs) {
      var _base, _ref, _ref1;
      if ((_ref = componentCur.conceptIdentity) == null) {
        componentCur.conceptIdentity = {};
      }
      return (_ref1 = (_base = componentCur.conceptIdentity).ref) != null ? _ref1 : _base.ref = _.extend({}, attrs);
    }