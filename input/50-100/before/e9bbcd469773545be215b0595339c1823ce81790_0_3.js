function() {
            var operator, term, _ref3;
            term = parseFactor();
            while ((token != null) && token.type === Scanner.OPERATOR && ((_ref3 = token.value) === "*" || _ref3 === "/")) {
              operator = token.value;
              next();
              term = Expression.initOperator(operator, [term, parseFactor()]);
            }
            return term;
          }