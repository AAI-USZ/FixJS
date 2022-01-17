function(keyword) {
      var _base, _base1, _base2, _name, _name1, _name2;
      this.log.debug("" + this.constructor.name + " onKeyword");
      if (PCAXIS_KEYWORDS[keyword.name] == null) {
        throw new Error("Invalid keyword " + keyword.name);
      }
      if (keyword.name === 'LANGUAGE') {
        this.lang = keyword.value;
      }
      if (PCAXIS_KEYWORDS[keyword.name][LANGUAGE]) {
        if (keyword.language == null) {
          keyword.language = this.lang;
        }
      }
      if ((_base = this.keywords)[_name = keyword.name] == null) {
        _base[_name] = [];
      }
      this.keywords[keyword.name].push(keyword);
      if (keyword.variable != null) {
        if ((_base1 = this.variables)[_name1 = keyword.variable] == null) {
          _base1[_name1] = {};
        }
        if ((_base2 = this.variables[keyword.variable])[_name2 = keyword.name] == null) {
          _base2[_name2] = [];
        }
        this.variables[keyword.variable][keyword.name].push(keyword);
      }
      if (keyword.name === 'MATRIX') {
        this.dataSetId = keyword.value.toUpperCase();
      }
      if (keyword.name === 'SOURCE') {
        return this.agencyId = keyword.value.toUpperCase();
      }
    }