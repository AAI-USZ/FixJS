function() {
        var _ref2, _ref3, _ref4, _ref5, _ref6;
        switch (ast.className) {
          case 'Program':
            options.ancestors = [ast].concat(__slice.call(options.ancestors));
            if (ast.block != null) {
              return generate(ast.block, options);
            } else {
              return '';
            }
            break;
          case 'Block':
            options = clone(options, {
              ancestors: [ast].concat(__slice.call(options.ancestors)),
              precedence: 0
            });
            if (ast.statements.length === 0) {
              return generate((new Undefined).g(), options);
            } else {
              sep = parentClassName === 'Program' ? '\n\n' : '\n';
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
            }
            break;
          case 'Conditional':
            options.ancestors.unshift(ast);
            options.precedence = 0;
            hasElseBlock = (ast.block != null) && (ast.elseBlock != null);
            _block = generate((_ref2 = ast.block) != null ? _ref2 : (new Undefined).g(), options);
            _elseBlock = hasElseBlock ? generate(ast.elseBlock, options) : "";
            isMultiline = _block.length > 90 || _elseBlock.length > 90 || __indexOf.call(_elseBlock, '\n') >= 0 || __indexOf.call(_block, '\n') >= 0;
            _block = isMultiline ? "\n" + (indent(_block)) : " then " + _block;
            if (hasElseBlock) {
              _elseBlock = isMultiline ? "\nelse\n" + (indent(_elseBlock)) : " else " + _elseBlock;
            }
            return "if " + (generate(ast.condition, options)) + _block + _elseBlock;
          case 'Identifier':
            return ast.data;
          case 'Null':
            return 'null';
          case 'This':
            return 'this';
          case 'Undefined':
            prec = precedence[ast.className];
            needsParens = prec < options.precedence;
            return 'void 0';
          case 'Int':
            absNum = ast.data < 0 ? -ast.data : ast.data;
            if (absNum >= 1e12 || (absNum >= 0x10 && 0 === (absNum & (absNum - 1)))) {
              return "0x" + (ast.data.toString(16));
            } else {
              return ast.data.toString(10);
            }
            break;
          case 'Float':
            return ast.data.toString(10);
          case 'String':
            return "'" + (formatStringData(ast.data)) + "'";
          case 'ArrayInitialiser':
            options = clone(options, {
              ancestors: [ast].concat(__slice.call(options.ancestors)),
              precedence: precedence.AssignmentExpression
            });
            members_ = (function() {
              var _i, _len, _ref3, _results;
              _ref3 = ast.members;
              _results = [];
              for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
                m = _ref3[_i];
                _results.push(generate(m, options));
              }
              return _results;
            })();
            switch (ast.members.length) {
              case 0:
                return '[]';
              case 1:
              case 2:
                return "[" + (members_.join(', ')) + "]";
              default:
                return "[\n" + (indent(members_.join('\n'))) + "\n]";
            }
            break;
          case 'ObjectInitialiser':
            options.ancestors = [ast].concat(__slice.call(options.ancestors));
            members_ = (function() {
              var _i, _len, _ref3, _results;
              _ref3 = ast.members;
              _results = [];
              for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
                m = _ref3[_i];
                _results.push(generate(m, options));
              }
              return _results;
            })();
            switch (ast.members.length) {
              case 0:
                return '{}';
              case 1:
              case 2:
                return "{" + (members_.join(', ')) + "}";
              default:
                return "{\n" + (indent(members_.join('\n'))) + "\n}";
            }
            break;
          case 'ObjectInitialiserMember':
            options = clone(options, {
              ancestors: [ast].concat(__slice.call(options.ancestors)),
              precedence: precedence.AssignmentExpression
            });
            key_ = generate(ast.key, options);
            expression_ = generate(ast.expression, options);
            memberAccessOps = ['MemberAccessOp', 'ProtoMemberAccessOp', 'SoakedMemberAccessOp', 'SoakedProtoMemberAccessOp'];
            if (eq(ast.key, ast.expression)) {
              return "" + key_;
            } else if ((_ref3 = ast.expression.className, __indexOf.call(memberAccessOps, _ref3) >= 0) && ast.key.data === ast.expression.memberName) {
              return "" + expression_;
            } else {
              return "" + key_ + ": " + expression_;
            }
            break;
          case 'Function':
          case 'BoundFunction':
            options = clone(options, {
              ancestors: [ast].concat(__slice.call(options.ancestors)),
              precedence: precedence.AssignmentExpression
            });
            parameters = (function() {
              var _i, _len, _ref4, _results;
              _ref4 = ast.parameters;
              _results = [];
              for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
                p = _ref4[_i];
                _results.push(generate(p, options));
              }
              return _results;
            })();
            options.precedence = 0;
            _block = !(ast.block != null) || ast.block.className === 'Undefined' ? '' : generate(ast.block, options);
            _paramList = ast.parameters.length > 0 ? "(" + (parameters.join(', ')) + ") " : '';
            _body = _block.length === 0 ? '' : _paramList.length + _block.length < 100 && __indexOf.call(_block, '\n') < 0 ? " " + _block : "\n" + (indent(_block));
            switch (ast.className) {
              case 'Function':
                return "" + _paramList + "->" + _body;
              case 'BoundFunction':
                return "" + _paramList + "=>" + _body;
            }
            break;
          case 'AssignOp':
            prec = precedence[ast.className];
            needsParens = prec < options.precedence;
            options = clone(options, {
              ancestors: [ast].concat(__slice.call(options.ancestors)),
              precedence: prec
            });
            _assignee = generate(ast.assignee, options);
            _expr = generate(ast.expression, options);
            return "" + _assignee + " = " + _expr;
          case 'CompoundAssignOp':
            prec = precedence[ast.className];
            needsParens = prec < options.precedence;
            options = clone(options, {
              ancestors: [ast].concat(__slice.call(options.ancestors)),
              precedence: prec
            });
            _op = operators[ast.op.prototype.className];
            _assignee = generate(ast.assignee, options);
            _expr = generate(ast.expression, options);
            return "" + _assignee + " " + _op + "= " + _expr;
          case 'SeqOp':
            prec = precedence[ast.className];
            needsParens = prec < options.precedence;
            options = clone(options, {
              ancestors: [ast].concat(__slice.call(options.ancestors)),
              precedence: prec
            });
            _left = generate(ast.left, options);
            _right = generate(ast.right, options);
            return "" + _left + "; " + _right;
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
            _op = operators[ast.className];
            if (((_ref4 = ast.className) === 'InOp' || _ref4 === 'OfOp' || _ref4 === 'InstanceofOp') && parentClassName === 'LogicalNotOp') {
              _op = "not " + _op;
            }
            prec = precedence[ast.className];
            needsParens = prec < options.precedence;
            options = clone(options, {
              ancestors: [ast].concat(__slice.call(options.ancestors)),
              precedence: prec
            });
            _left = generate(ast.left, options);
            if (needsParensWhenOnLeft(ast.left)) {
              _left = parens(_left);
            }
            _right = generate(ast.right, options);
            return "" + _left + " " + _op + " " + _right;
          case 'UnaryPlusOp':
          case 'UnaryNegateOp':
          case 'LogicalNotOp':
          case 'BitNotOp':
          case 'DoOp':
          case 'TypeofOp':
          case 'PreIncrementOp':
          case 'PreDecrementOp':
            _op = operators[ast.className];
            prec = precedence[ast.className];
            if (ast.className === 'LogicalNotOp') {
              if ((_ref5 = ast.expression.className) === 'InOp' || _ref5 === 'OfOp' || _ref5 === 'InstanceofOp') {
                _op = '';
                prec = precedence[ast.expression.className];
              }
              if ('LogicalNotOp' === parentClassName || 'LogicalNotOp' === ast.expression.className) {
                _op = '!';
              }
            }
            needsParens = prec < options.precedence;
            if (parentClassName === ast.className && ((_ref6 = ast.className) === 'UnaryPlusOp' || _ref6 === 'UnaryNegateOp')) {
              needsParens = true;
            }
            options = clone(options, {
              ancestors: [ast].concat(__slice.call(options.ancestors)),
              precedence: prec
            });
            return "" + _op + (generate(ast.expression, options));
          case 'UnaryExistsOp':
          case 'PostIncrementOp':
          case 'PostDecrementOp':
          case 'Spread':
            _op = operators[ast.className];
            prec = precedence[ast.className];
            needsParens = prec < options.precedence;
            options = clone(options, {
              ancestors: [ast].concat(__slice.call(options.ancestors)),
              precedence: prec
            });
            _expr = generate(ast.expression, options);
            if (needsParensWhenOnLeft(ast.expression)) {
              _expr = parens(_expr);
            }
            return "" + _expr + _op;
          case 'NewOp':
            _op = operators[ast.className];
            prec = precedence[ast.className];
            options = clone(options, {
              ancestors: [ast].concat(__slice.call(options.ancestors)),
              precedence: prec
            });
            _ctor = generate(ast.constructor, options);
            if (ast["arguments"].length > 0 && needsParensWhenOnLeft(ast.constructor)) {
              _ctor = parens(_ctor);
            }
            options.precedence = precedence['AssignOp'];
            args = (function() {
              var _i, _len, _ref7, _results;
              _ref7 = ast["arguments"];
              _results = [];
              for (i = _i = 0, _len = _ref7.length; _i < _len; i = ++_i) {
                a = _ref7[i];
                arg = generate(a, options);
                if ((needsParensWhenOnLeft(a)) && i + 1 !== ast["arguments"].length) {
                  arg = parens(arg);
                }
                _results.push(arg);
              }
              return _results;
            })();
            _args = ast["arguments"].length === 0 ? '' : " " + (args.join(', '));
            return "" + _op + _ctor + _args;
          case 'FunctionApplication':
          case 'SoakedFunctionApplication':
            if (ast.className === 'FunctionApplication' && ast["arguments"].length === 0 && !usedAsExpression) {
              return generate(new DoOp(ast["function"]), options);
            } else {
              options = clone(options, {
                ancestors: [ast].concat(__slice.call(options.ancestors)),
                precedence: prec
              });
              _op = operators[ast.className];
              _fn = generate(ast["function"], options);
              if (needsParensWhenOnLeft(ast["function"])) {
                _fn = parens(_fn);
              }
              args = (function() {
                var _i, _len, _ref7, _results;
                _ref7 = ast["arguments"];
                _results = [];
                for (i = _i = 0, _len = _ref7.length; _i < _len; i = ++_i) {
                  a = _ref7[i];
                  arg = generate(a, options);
                  if ((needsParensWhenOnLeft(a)) && i + 1 !== ast["arguments"].length) {
                    arg = parens(arg);
                  }
                  _results.push(arg);
                }
                return _results;
              })();
              _argList = ast["arguments"].length === 0 ? '()' : " " + (args.join(', '));
              return "" + _fn + _op + _argList;
            }
            break;
          case 'MemberAccessOp':
          case 'SoakedMemberAccessOp':
          case 'ProtoMemberAccessOp':
          case 'SoakedProtoMemberAccessOp':
            _op = operators[ast.className];
            prec = precedence[ast.className];
            needsParens = prec < options.precedence;
            options = clone(options, {
              ancestors: [ast].concat(__slice.call(options.ancestors)),
              precedence: prec
            });
            if (ast.expression.className === 'This') {
              _expr = '@';
              if (ast.className === 'MemberAccessOp') {
                _op = '';
              }
            } else {
              _expr = generate(ast.expression, options);
              if (needsParensWhenOnLeft(ast.expression)) {
                _expr = parens(_expr);
              }
            }
            return "" + _expr + _op + ast.memberName;
          case 'DynamicMemberAccessOp':
          case 'SoakedDynamicMemberAccessOp':
          case 'DynamicProtoMemberAccessOp':
          case 'SoakedDynamicProtoMemberAccessOp':
            _op = operators[ast.className];
            prec = precedence[ast.className];
            needsParens = prec < options.precedence;
            options = clone(options, {
              ancestors: [ast].concat(__slice.call(options.ancestors)),
              precedence: prec
            });
            if (ast.expression.className === 'This') {
              _expr = '@';
            } else {
              _expr = generate(ast.expression, options);
              if (needsParensWhenOnLeft(ast.expression)) {
                _expr = parens(_expr);
              }
            }
            options.precedence = 0;
            _indexingExpr = generate(ast.indexingExpr, options);
            return "" + _expr + _op + "[" + _indexingExpr + "]";
          case 'ConcatOp':
            _left = formatInterpolation(ast.left, options);
            _right = formatInterpolation(ast.right, options);
            return "\"" + _left + _right + "\"";
          default:
            throw new Error("Non-exhaustive patterns in case: " + ast.className);
        }
      }