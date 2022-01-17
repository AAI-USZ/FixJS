function() {

    PcAxisParser.name = 'PcAxisParser';

    function PcAxisParser(log) {
      this.log = log;
      this.keyword = {};
      this["function"] = {};
      this.symbol = NONE;
      this.token = [];
      this.atEnd = false;
      this.parser = this.parseMetadata;
      this.dataArrayMaxLength = 1;
      this.dataArray = [];
    }

    PcAxisParser.prototype.parse = function(data) {
      this.log.debug("" + this.constructor.name + " parse");
      if (this.atEnd) {
        throw new Error('PC-Axis file is at end.');
      }
      return this.parser(data);
    };

    PcAxisParser.prototype.end = function() {
      this.log.debug("" + this.constructor.name + " end");
      if (!this.atEnd) {
        throw new Error('PC-Axis file is not complete.');
      }
    };

    PcAxisParser.prototype.onKeyword = function() {};

    PcAxisParser.prototype.onData = function() {};

    PcAxisParser.prototype.onDataValue = function() {};

    PcAxisParser.prototype.onEndOfData = function() {};

    PcAxisParser.prototype.saveToken = function() {
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
    };

    PcAxisParser.prototype.saveKeyword = function() {
      var _ref;
      this.log.debug("" + this.constructor.name + " saveKeyword");
      if (((_ref = this.keyword.value) != null ? _ref.length : void 0) === 1) {
        this.keyword.value = this.keyword.value[0];
      }
      this.onKeyword(this.keyword);
      this.keyword = {};
      this.symbol = NONE;
      return this.token = [];
    };

    PcAxisParser.prototype.saveDataValue = function() {
      this.log.debug("" + this.constructor.name + " saveDataValue");
      this.dataArray.push(this.symbol === VALUE ? Number(this.token.join('')) : this.token.join(''));
      if (this.dataArray.length === this.dataArrayMaxLength) {
        this.onDataValue(this.dataArray);
        this.dataArray = [];
      }
      this.token = [];
      return this.symbol = NONE;
    };

    PcAxisParser.prototype.switchToDataParsing = function(data, i) {
      this.log.debug("" + this.constructor.name + " switchToDataParsing");
      this.parser = this.parseData;
      this.onData();
      return this.parseData(data, i);
    };

    PcAxisParser.prototype.endOfData = function() {
      if (0 < this.dataArray.length) {
        this.onDataValue(this.dataArray);
      }
      this.atEnd = true;
      return this.onEndOfData();
    };

    PcAxisParser.prototype.parseData = function(data, start) {
      var c, i, len, s;
      this.log.debug("" + this.constructor.name + " parseData");
      len = data.length;
      c = -1;
      i = start != null ? start : -1;
      while ((i += 1) < len) {
        c = data.readUInt8(i);
        s = String.fromCharCode(c);
        switch (this.symbol) {
          case NONE:
            if (c <= SPACE || c === DEL || c === COMMA) {
              continue;
            }
            switch (c) {
              case DOUBLE_QUOTES:
                this.symbol = VALUE_STRING;
                break;
              case SEMICOLON:
                this.endOfData();
                return;
              default:
                this.symbol = VALUE;
                this.token.push(s);
            }
            break;
          case VALUE_STRING:
            switch (c) {
              case DOUBLE_QUOTES:
                this.saveDataValue();
                this.symbol = NONE;
                break;
              default:
                this.token.push(s);
            }
            break;
          case VALUE:
            if (c <= SPACE || c === DEL || c === COMMA) {
              this.saveDataValue();
              this.symbol = NONE;
              continue;
            }
            switch (c) {
              case SEMICOLON:
                this.saveDataValue();
                this.endOfData();
                return;
              default:
                this.token.push(s);
            }
        }
      }
    };

    PcAxisParser.prototype.parseMetadata = function(data) {
      var c, i, len, s;
      this.log.debug("" + this.constructor.name + " parseMetadata");
      len = data.length;
      i = c = -1;
      while ((i += 1) < len) {
        c = data.readUInt8(i);
        s = String.fromCharCode(c);
        switch (this.symbol) {
          case NONE:
            if (c <= SPACE || c === DEL) {
              continue;
            }
            this.symbol = NAME;
            this.token.push(s);
            break;
          case NAME:
            switch (c) {
              case OPENING_BRACKET:
                this.saveToken();
                this.symbol = LANGUAGE;
                break;
              case OPENING_PARENTHESIS:
                this.saveToken();
                this.symbol = VARIABLE;
                break;
              case EQUAL_SIGN:
                this.saveToken();
                this.symbol = VALUE;
                if (this.keyword.name === 'DATA') {
                  this.symbol = NONE;
                  this.switchToDataParsing(data, i);
                  return;
                }
                break;
              default:
                this.token.push(s);
            }
            break;
          case LANGUAGE:
            switch (c) {
              case CLOSING_BRACKET:
                this.saveToken();
                this.symbol = NAME;
                break;
              default:
                this.token.push(s);
            }
            break;
          case VARIABLE:
            switch (c) {
              case CLOSING_PARENTHESIS:
                this.saveToken();
                this.symbol = NAME;
                break;
              case COMMA:
                this.saveToken();
                this.symbol = VALUE_NAME;
                break;
              case DOUBLE_QUOTES:
                this.symbol = VARIABLE_STRING;
            }
            break;
          case VARIABLE_STRING:
            switch (c) {
              case DOUBLE_QUOTES:
                this.symbol = VARIABLE;
                break;
              default:
                this.token.push(s);
            }
            break;
          case VALUE_NAME:
            switch (c) {
              case CLOSING_PARENTHESIS:
                this.saveToken();
                this.symbol = NAME;
                break;
              case DOUBLE_QUOTES:
                this.symbol = VALUE_NAME_STRING;
            }
            break;
          case VALUE_NAME_STRING:
            switch (c) {
              case DOUBLE_QUOTES:
                this.symbol = VALUE_NAME;
                break;
              default:
                this.token.push(s);
            }
            break;
          case VALUE:
            if (c <= SPACE || c === DEL) {
              continue;
            }
            switch (c) {
              case COMMA:
                this.saveToken();
                break;
              case DOUBLE_QUOTES:
                this.symbol = VALUE_STRING;
                break;
              case SEMICOLON:
                this.saveToken();
                this.saveKeyword();
                break;
              case OPENING_PARENTHESIS:
                this.symbol = FUNCTION;
                this.saveToken();
                this.symbol = ARGUMENT;
                break;
              default:
                this.token.push(s);
            }
            break;
          case VALUE_STRING:
            switch (c) {
              case DOUBLE_QUOTES:
                this.symbol = VALUE;
                break;
              default:
                this.token.push(s);
            }
            break;
          case ARGUMENT:
            if (c <= SPACE || c === DEL) {
              continue;
            }
            switch (c) {
              case DOUBLE_QUOTES:
                continue;
              case COMMA:
              case HYPHEN:
                this.saveToken();
                break;
              case CLOSING_PARENTHESIS:
                this.saveToken();
                this.symbol = VALUE;
                break;
              default:
                this.token.push(s);
            }
        }
      }
    };

    return PcAxisParser;

  }