function(attrs) {
      var _ref;
      if ((_ref = codeListCur.codes) == null) {
        codeListCur.codes = {};
      }
      return codeListCur.codes[codeCur.id] = codeCur;
    }