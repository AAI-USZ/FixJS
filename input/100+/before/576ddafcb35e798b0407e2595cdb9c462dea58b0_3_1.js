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