function() {
      var token, _base, _base1, _base2;
      if (this.token.length === 0) {
        return;
      }
      token = this.token.join('');
      switch (this.symbol) {
        case NAME:
          this.keyword.name = token;
          break;
        case LANGUAGE:
          this.keyword.language = token;
          break;
        case VARIABLE:
          this.keyword.variable = token;
          break;
        case VALUE_NAME:
          this.keyword.valueName = token;
          break;
        case VALUE:
        case VALUE_STRING:
          if ((_base = this.keyword).value == null) {
            _base.value = [];
          }
          this.keyword.value.push(token);
          break;
        case FUNCTION:
          this["function"] = {};
          this["function"].name = token;
          if ((_base1 = this.keyword).value == null) {
            _base1.value = [];
          }
          this.keyword.value.push(this["function"]);
          break;
        case ARGUMENT:
          if ((_base2 = this["function"]).args == null) {
            _base2.args = [];
          }
          this["function"].args.push(token);
      }
      return this.token = [];
    }