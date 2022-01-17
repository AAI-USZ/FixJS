function() {
        var _ref2, _ref3, _ref4;
        switch (ast.className) {
          case 'Program':
            options.ancestors.unshift(ast);
            return generate(ast.block, options);
          case 'Block':
            options.ancestors.unshift(ast);
            sep = '\n';
            if (parentClassName === 'Program') {
              sep = "" + sep + "\n";
            }
            return ((function() {
              var _i, _len, _ref2, _results;
              _ref2 = ast.statements;
              _results = [];
              for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
                s = _ref2[_i];
                _results.push(generate(s, options));
              }
              return _results;
            })()).join(sep);
          case 'Identifier':
            return ast.data;
          case 'Int':
            absNum = ast.data < 0 ? -ast.data : ast.data;
            if (absNum >= 1e12 || (absNum >= 0x10 && 0 === absNum & (absNum - 1))) {
              return ast.data.toString(16);
            } else {
              return ast.data.toString(10);
            }
            break;
          case 'String':
            return "'" + (formatStringData(ast.data)) + "'";
          case 'Function':
          case 'BoundFunction':
            options.ancestors.unshift(ast);
            options.precedence = precedence['AssignmentExpression'];
            parameters = (function() {
              var _i, _len, _ref2, _results;
              _ref2 = ast.parameters;
              _results = [];
              for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
                p = _ref2[_i];
                _results.push(generate(p, options));
              }
              return _results;
            })();
            options.precedence = 0;
            block = generate(ast.block, options);
            paramList = ast.parameters.length > 0 ? "(" + (parameters.join(', ')) + ") " : '';
            body = (function() {
              switch (ast.block.statements.length) {
                case 0:
                  return "";
                case 1:
                  return " " + block;
                default:
                  return "\n" + (indent(block));
              }
            })();
            switch (ast.className) {
              case 'Function':
                return "" + paramList + "->" + body;
              case 'BoundFunction':
                return "" + paramList + "=>" + body;
            }
            break;
          case 'AssignOp':
            prec = precedence[ast.className];
            needsParens = prec < options.precedence;
            options.precedence = prec;
            options.ancestors.unshift(ast);
            assignee = generate(ast.assignee, options);
            expr = generate(ast.expr, options);
            return "" + assignee + " = " + expr;
          case 'SeqOp':
            prec = precedence[ast.className];
            needsParens = prec < options.precedence;
            options.precedence = prec;
            options.ancestors.unshift(ast);
            left = generate(ast.left, options);
            right = generate(ast.right, options);
            return "" + left + "; " + right;
          case 'LogicalOrOp':
          case 'LogicalAndOp':
          case 'BitOrOp':
          case 'BitXorOp':
          case 'BitAndOp':
          case 'LeftShiftOp':
          case 'SignedRightShiftOp':
          case 'UnsignedRightShiftOp':
          case 'EQOp':
          case 'NEQOp':
          case 'LTOp':
          case 'LTEOp':
          case 'GTOp':
          case 'GTEOp':
          case 'InOp':
          case 'OfOp':
          case 'InstanceofOp':
          case 'PlusOp':
          case 'SubtractOp':
          case 'MultiplyOp':
          case 'DivideOp':
          case 'RemOp':
          case 'ExistsOp':
            op = operators[ast.className];
            if (((_ref2 = ast.className) === 'InOp' || _ref2 === 'OfOp' || _ref2 === 'InstanceofOp') && parentClassName === 'LogicalNotOp') {
              op = "not " + op;
            }
            prec = precedence[ast.className];
            needsParens = prec < options.precedence;
            options.precedence = prec;
            options.ancestors.unshift(ast);
            left = generate(ast.left, options);
            if (needsParensWhenOnLeft(ast.left)) {
              left = parens(left);
            }
            right = generate(ast.right, options);
            return "" + left + " " + op + " " + right;
          case 'UnaryPlusOp':
          case 'UnaryNegateOp':
          case 'LogicalNotOp':
          case 'BitNotOp':
          case 'DoOp':
          case 'TypeofOp':
          case 'PreIncrementOp':
          case 'PreDecrementOp':
            op = operators[ast.className];
            prec = precedence[ast.className];
            if (ast.className === 'LogicalNotOp') {
              if ((_ref3 = ast.expr.className) === 'InOp' || _ref3 === 'OfOp' || _ref3 === 'InstanceofOp') {
                op = '';
                prec = precedence[ast.expr.className];
              }
              if ('LogicalNotOp' === parentClassName || 'LogicalNotOp' === ast.expr.className) {
                op = '!';
              }
            }
            needsParens = prec < options.precedence;
            if (parentClassName === ast.className && ((_ref4 = ast.className) === 'UnaryPlusOp' || _ref4 === 'UnaryNegateOp')) {
              needsParens = true;
            }
            options.precedence = prec;
            options.ancestors.unshift(ast);
            return "" + op + (generate(ast.expr, options));
          case 'UnaryExistsOp':
          case 'PostIncrementOp':
          case 'PostDecrementOp':
          case 'Spread':
            op = operators[ast.className];
            prec = precedence[ast.className];
            needsParens = prec < options.precedence;
            options.precedence = prec;
            options.ancestors.unshift(ast);
            expr = generate(ast.expr, options);
            if (needsParensWhenOnLeft(ast.expr)) {
              expr = parens(expr);
            }
            return "" + expr + op;
          case 'NewOp':
            op = operators[ast.className];
            prec = precedence[ast.className];
            options.precedence = prec;
            options.ancestors.unshift(ast);
            ctor = generate(ast.ctor, options);
            if (ast["arguments"].length > 0 && needsParensWhenOnLeft(ast.ctor)) {
              ctor = parens(ctor);
            }
            options.precedence = precedence['AssignOp'];
            args = (function() {
              var _i, _len, _ref5, _results;
              _ref5 = ast["arguments"];
              _results = [];
              for (i = _i = 0, _len = _ref5.length; _i < _len; i = ++_i) {
                a = _ref5[i];
                arg = generate(a, options);
                if ((needsParensWhenOnLeft(a)) && i + 1 !== ast["arguments"].length) {
                  arg = parens(arg);
                }
                _results.push(arg);
              }
              return _results;
            })();
            args = args.join(', ');
            if (ast["arguments"].length > 0) {
              args = " " + args;
            }
            return "" + op + ctor + args;
          case 'FunctionApplication':
          case 'SoakedFunctionApplication':
            if (ast.className === 'FunctionApplication' && ast["arguments"].length === 0 && !usedAsExpression) {
              return generate(new DoOp(ast["function"]), options);
            } else {
              op = operators[ast.className];
              options.precedence = precedence[ast.className];
              options.ancestors.unshift(ast);
              fn = generate(ast["function"], options);
              if (needsParensWhenOnLeft(ast["function"])) {
                fn = parens(fn);
              }
              args = (function() {
                var _i, _len, _ref5, _results;
                _ref5 = ast["arguments"];
                _results = [];
                for (i = _i = 0, _len = _ref5.length; _i < _len; i = ++_i) {
                  a = _ref5[i];
                  arg = generate(a, options);
                  if ((needsParensWhenOnLeft(a)) && i + 1 !== ast["arguments"].length) {
                    arg = parens(arg);
                  }
                  _results.push(arg);
                }
                return _results;
              })();
              argList = ast["arguments"].length === 0 ? '()' : " " + (args.join(', '));
              return "" + fn + op + argList;
            }
            break;
          case 'MemberAccessOp':
          case 'SoakedMemberAccessOp':
          case 'ProtoMemberAccessOp':
          case 'SoakedProtoMemberAccessOp':
            op = operators[ast.className];
            prec = precedence[ast.className];
            needsParens = prec < options.precedence;
            options.precedence = prec;
            options.ancestors.unshift(ast);
            expr = generate(ast.expr, options);
            if (needsParensWhenOnLeft(ast.expr)) {
              expr = parens(expr);
            }
            return "" + expr + op + ast.memberName;
          case 'DynamicMemberAccessOp':
          case 'SoakedDynamicMemberAccessOp':
          case 'DynamicProtoMemberAccessOp':
          case 'SoakedDynamicProtoMemberAccessOp':
            op = operators[ast.className];
            prec = precedence[ast.className];
            needsParens = prec < options.precedence;
            options.precedence = prec;
            options.ancestors.unshift(ast);
            expr = generate(ast.expr, options);
            if (needsParensWhenOnLeft(ast.expr)) {
              expr = parens(expr);
            }
            options.precedence = 0;
            indexingExpr = generate(ast.indexingExpr, options);
            return "" + expr + op + "[" + indexingExpr + "]";
          case 'ConcatOp':
            left = formatInterpolation(ast.left, options);
            right = formatInterpolation(ast.right, options);
            return "\"" + left + right + "\"";
          default:
            throw new Error("Non-exhaustive patterns in case: " + ast.className);
        }
      }