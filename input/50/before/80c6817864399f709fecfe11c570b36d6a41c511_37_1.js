function(attrs) {
      if (codeListCur.codes == null) {
        codeListCur.codes = {};
      }
      return codeListCur.codes[codeCur.id] = codeCur;
    }