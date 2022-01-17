function(scanner, several) {
          var Scanner, expressions, makePosition, next, parseExpression, parseExpressionList, parsePath, r, roots, token, _i, _len;
          token = scanner.token();
          Scanner = Expression.initScanner;
          next = function() {
            scanner.next();
            return token = scanner.token();
          };
          parseExpressionList = function() {
            var expressions;
            expressions = [parseExpression()];
            while ((token != null) && token.type === Scanner.DELIMITER && token.value === ",") {
              next();
              expressions.push(parseExpression());
            }
            return expressions;
          };
          makePosition = function() {
            if (token != null) {
              return token.start;
            } else {
              return scanner.index();
            }
          };
          parsePath = function() {
            var hopOperator, path;
            path = Expression.initPath();
            while ((token != null) && token.type === Scanner.PATH_OPERATOR) {
              hopOperator = token.value;
              next();
              if ((token != null) && token.type === Scanner.IDENTIFIER) {
                path.appendSegment(token.value, hopOperator);
                next();
              } else {
                throw new Error("Missing property ID at position " + makePosition());
              }
            }
            return path;
          };
          parseExpression = function() {
            var args, identifier, result;
            result = null;
            args = [];
            if (!(token != null)) {
              throw new Error("Missing factor at end of expression");
            }
            switch (token.type) {
              case Scanner.NUMBER:
                result = Expression.initConstant(token.value, "number");
                next();
                break;
              case Scanner.STRING:
                result = Expression.initConstant(token.value, "text");
                next();
                break;
              case Scanner.PATH_OPERATOR:
                result = parsePath();
                break;
              case Scanner.IDENTIFIER:
                identifier = token.value;
                next();
                if (Expression.controls[identifier] != null) {
                  if ((token != null) && token.type === Scanner.DELIMITER && token.value === "(") {
                    next();
                    if ((token != null) && token.type === Scanner.DELIMITER && token.value === ")") {
                      args = [];
                    } else {
                      args = parseExpressionList();
                    }
                    result = Expression.initControlCall(identifier, args);
                    if ((token != null) && token.type === Scanner.DELIMITER && token.value === ")") {
                      next();
                    } else {
                      throw new Error("Missing ) to end " + identifier + " at position " + makePosition());
                    }
                  } else {
                    throw new Error("Missing ( to start " + identifier + " at position " + makePosition());
                  }
                } else {
                  if ((token != null) && token.type === Scanner.DELIMITER && token.value === "(") {
                    next();
                    if ((token != null) && token.type === Scanner.DELIMITER && token.value === ")") {
                      args = [];
                    } else {
                      args = parseExpressionList();
                    }
                    result = Expression.initFunctionCall(identifier, args);
                    if ((token != null) && token.type === Scanner.DELIMITER && token.value === ")") {
                      next();
                    } else {
                      throw new Error("Missing ) after function call " + identifier + " at position " + makePosition());
                    }
                  } else {
                    result = parsePath();
                    result.setRootName(identifier);
                  }
                }
                break;
              case Scanner.DELIMITER:
                if (token.value === "(") {
                  next();
                  result = parseExpression();
                  if ((token != null) && token.type === Scanner.DELIMITER && token.value === ")") {
                    next();
                  } else {
                    throw new Error("Missing ) at position " + makePosition());
                  }
                } else {
                  throw new Error("Unexpected text " + token.value + " at position " + makePosition());
                }
                break;
              default:
                throw new Error("Unexpected text " + token.value + " at position " + makePosition());
            }
            return result;
          };
          if (several) {
            roots = parseExpressionList();
            expressions = [];
            for (_i = 0, _len = roots.length; _i < _len; _i++) {
              r = roots[_i];
              expressions.push(Expression.initExpression(r));
            }
            return expressions;
          } else {
            return [Expression.initExpression(parseExpression())];
          }
        }