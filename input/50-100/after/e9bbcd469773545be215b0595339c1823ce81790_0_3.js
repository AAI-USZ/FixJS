function() {
            var expressions;
            expressions = [parseExpression()];
            while ((token != null) && token.type === Scanner.DELIMITER && token.value === ",") {
              next();
              expressions.push(parseExpression());
            }
            return expressions;
          }