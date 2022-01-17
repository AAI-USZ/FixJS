function(ast, options) {
      var a, arg, argList, args, assignee, block, body, ctor, expr, fn, i, indexingExpr, left, memberName, needsParens, op, p, paramList, parameters, prec, right, s, src, _ref;
      if (options == null) {
        options = {};
      }
      needsParens = false;
      if ((_ref = options.precedence) == null) {
        options.precedence = 0;
      }
      src = (function() {
        var _ref1;
        switch (ast.className) {
          case 'Program':
            return generate(ast.block, options);
          case 'Block':
            return ((function() {
              var _i, _len, _ref1, _results;
              _ref1 = ast.statements;
              _results = [];
              for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                s = _ref1[_i];
                _results.push(generate(s, options));
              }
              return _results;
            })()).join('\n\n');
          case 'Identifier':
            return ast.data;
          case 'Int':
            return ast.data;
          case 'String':
            return "'" + (formatStringData(ast.data)) + "'";
          case 'Function':
          case 'BoundFunction':
            options.precedence = precedence['AssignmentExpression'];
            parameters = (function() {
              var _i, _len, _ref1, _results;
              _ref1 = ast.parameters;
              _results = [];
              for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                p = _ref1[_i];
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
            assignee = generate(ast.assignee, options);
            expr = generate(ast.expr, options);
            return "" + assignee + " = " + expr;
          case 'SeqOp':
            prec = precedence[ast.className];
            needsParens = prec < options.precedence;
            options.precedence = prec;
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
            prec = precedence[ast.className];
            needsParens = prec < options.precedence;
            options.precedence = prec;
            left = generate(ast.left, options);
            if (needsParensWhenOnLeft(ast.left)) {
              left = "(" + left + ")";
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
            if (ast.className === 'LogicalNotOp') {
              switch (ast.expr.className) {
                case 'LogicalNotOp':
                  op = '!';
                  while (ast.expr.className === 'LogicalNotOp') {
                    op += '!';
                    ast.expr = ast.expr.expr;
                  }
              }
            }
            prec = precedence[ast.className];
            needsParens = prec < options.precedence;
            options.precedence = prec;
            expr = generate(ast.expr, options);
            if (ast.expr.className === ast.className && ((_ref1 = ast.className) === 'UnaryPlusOp' || _ref1 === 'UnaryNegateOp')) {
              expr = "(" + expr + ")";
            }
            return "" + op + expr;
          case 'UnaryExistsOp':
          case 'PostIncrementOp':
          case 'PostDecrementOp':
          case 'Spread':
            op = operators[ast.className];
            prec = precedence[ast.className];
            needsParens = prec < options.precedence;
            options.precedence = prec;
            expr = generate(ast.expr, options);
            if (needsParensWhenOnLeft(ast.expr)) {
              expr = "(" + expr + ")";
            }
            return "" + expr + op;
          case 'NewOp':
            op = operators[ast.className];
            prec = precedence[ast.className];
            needsParens = prec < options.precedence;
            options.precedence = prec;
            ctor = generate(ast.ctor, options);
            if (ast["arguments"].length > 0 && needsParensWhenOnLeft(ast.ctor)) {
              ctor = "(" + ctor + ")";
            }
            options.precedence = precedence['AssignOp'];
            args = (function() {
              var _i, _len, _ref2, _results;
              _ref2 = ast["arguments"];
              _results = [];
              for (i = _i = 0, _len = _ref2.length; _i < _len; i = ++_i) {
                a = _ref2[i];
                arg = generate(a, options);
                if ((needsParensWhenOnLeft(a)) && i + 1 !== ast["arguments"].length) {
                  arg = "(" + arg + ")";
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
            op = operators[ast.className];
            options.precedence = precedence[ast.className];
            fn = generate(ast["function"], options);
            if (needsParensWhenOnLeft(ast["function"])) {
              fn = "(" + fn + ")";
            }
            args = (function() {
              var _i, _len, _ref2, _results;
              _ref2 = ast["arguments"];
              _results = [];
              for (i = _i = 0, _len = _ref2.length; _i < _len; i = ++_i) {
                a = _ref2[i];
                arg = generate(a, options);
                if ((needsParensWhenOnLeft(a)) && i + 1 !== ast["arguments"].length) {
                  arg = "(" + arg + ")";
                }
                _results.push(arg);
              }
              return _results;
            })();
            argList = ast["arguments"].length === 0 ? '()' : " " + (args.join(', '));
            return "" + fn + op + argList;
          case 'MemberAccessOp':
          case 'SoakedMemberAccessOp':
          case 'ProtoMemberAccessOp':
          case 'SoakedProtoMemberAccessOp':
            op = operators[ast.className];
            prec = precedence[ast.className];
            needsParens = prec < options.precedence;
            options.precedence = prec;
            expr = generate(ast.expr, options);
            memberName = generate(ast.memberName, options);
            return "" + expr + op + memberName;
          case 'DynamicMemberAccessOp':
          case 'SoakedDynamicMemberAccessOp':
          case 'DynamicProtoMemberAccessOp':
          case 'SoakedDynamicProtoMemberAccessOp':
            op = operators[ast.className];
            prec = precedence[ast.className];
            needsParens = prec < options.precedence;
            options.precedence = prec;
            expr = generate(ast.expr, options);
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
      })();
      if (needsParens) {
        return parens(src);
      } else {
        return src;
      }
    }