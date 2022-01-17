function parse_parenthesis_expression() {
        var result0;
        
        result0 = parse_expression_3();
        if (result0 === null) {
          result0 = parse_expression_1();
          if (result0 === null) {
            result0 = parse_expression_2();
          }
        }
        return result0;
      }