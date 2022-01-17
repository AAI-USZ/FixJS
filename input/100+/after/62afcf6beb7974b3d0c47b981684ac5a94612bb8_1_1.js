function() {
    var Noop;

    function Construct(value, yy_or_node_or_num) {
      var _ref1;
      this.value = value;
      if (yy_or_node_or_num instanceof Construct) {
        this.transfer_node = yy_or_node_or_num;
        this.yy = yy_or_node_or_num.yy;
      } else if ((L.core.to_type(yy_or_node_or_num)) === "number") {
        this.yy = {
          lexer: {
            yylineno: yy_or_node_or_num
          }
        };
      } else {
        this.yy = yy_or_node_or_num;
      }
      this.line_number = (_ref1 = this.yy) != null ? _ref1.lexer.yylineno : void 0;
    }

    Construct.prototype.compile = function() {
      if (this.value != null) {
        return "" + this.value;
      } else {
        return "null";
      }
    };

    Construct.prototype._compile = function() {
      return this.compile.apply(this, arguments);
    };

    Construct.prototype.error = function(message) {
      var filename, location, type;
      filename = C.current_filename;
      location = "";
      type = "";
      if (filename != null) {
        location += " in " + filename;
      }
      if (this.line_number != null) {
        location += " at line " + this.line_number;
      }
      if (this.constructor.name != null) {
        type = "" + this.constructor.name;
      }
      throw "" + type + "Error" + location + ": " + message;
    };

    Construct.prototype.should_return = function() {
      return new C.ReturnedConstruct(this, this.yy);
    };

    Construct.prototype.Noop = Noop = (function() {

      function Noop(c) {
        this.constructor = c;
      }

      return Noop;

    })();

    Construct.prototype.clone = function() {
      var Class, cl, np, p, prop, val, _ref1;
      Class = this.constructor;
      p = Class.prototype;
      np = this.Noop.prototype;
      this.Noop.prototype = p;
      cl = new Noop(Class);
      this.Noop.prototype = np;
      for (prop in this) {
        if (!__hasProp.call(this, prop)) continue;
        val = this[prop];
        val = (_ref1 = val != null ? typeof val.clone === "function" ? val.clone() : void 0 : void 0) != null ? _ref1 : val;
        cl[prop] = val;
      }
      return cl;
    };

    return Construct;

  }