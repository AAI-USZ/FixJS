function() {

  (function(exports) {
    var TAB, formatInterpolation, formatStringData, generate, indent, levels, needsParensWhenOnLeft, operators, parens, precedence;
    TAB = '  ';
    indent = function(code) {
      var line;
      return ((function() {
        var _i, _len, _ref, _results;
        _ref = code.split('\n');
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          line = _ref[_i];
          _results.push("" + TAB + line);
        }
        return _results;
      })()).join('\n');
    };
    parens = function(code) {
      return "(" + code + ")";
    };
    formatStringData = function(data) {
      return data.replace(/[^\x20-\x7e]|['\\]/, function(c) {
        var escape, pad;
        switch (c) {
          case '\0':
            return '\\0';
          case '\b':
            return '\\b';
          case '\t':
            return '\\t';
          case '\n':
            return '\\n';
          case '\f':
            return '\\f';
          case '\r':
            return '\\r';
          case '\'':
            return '\\\'';
          case '\\':
            return '\\\\';
          default:
            escape = (c.charCodeAt(0)).toString(16);
            pad = "0000".slice(escape.length);
            return "\\u" + pad + escape;
        }
      });
    };
    formatInterpolation = function(ast, options) {
      var left, right;
      switch (ast.className) {
        case "ConcatOp":
          left = formatInterpolation(ast.left, options);
          right = formatInterpolation(ast.right, options);
          return "" + left + right;
        case "String":
          return formatStringData(ast.data);
        default:
          return "\#{" + (generate(ast, options)) + "}";
      }
    };
    needsParensWhenOnLeft = function(ast) {
      switch (ast.className) {
        case 'Function':
        case 'BoundFunction':
        case 'NewOp':
          return true;
        case 'Conditional':
        case 'Switch':
        case 'While':
        case 'Block':
          return true;
        case 'PreIncrementOp':
        case 'PreDecrementOp':
        case 'UnaryPlusOp':
        case 'UnaryNegateOp':
        case 'LogicalNotOp':
        case 'BitNotOp':
        case 'DoOp':
        case 'TypeofOp':
        case 'DeleteOp':
          return needsParensWhenOnLeft(ast.expr);
        case 'FunctionApplication':
          return ast["arguments"].length > 0;
        default:
          return false;
      }
    };
    levels = [['SeqOp'], ['Conditional', 'ForIn', 'ForOf', 'While'], ['FunctionApplication', 'SoakedFunctionApplication'], ['AssignOp', 'CompoundAssignOp', 'ExistsAssignOp'], ['LogicalOrOp'], ['LogicalAndOp'], ['BitOrOp'], ['BitXorOp'], ['BitAndOp'], ['ExistsOp'], ['EQOp', 'NEQOp'], ['LTOp', 'LTEOp', 'GTOp', 'GTEOp', 'InOp', 'OfOp', 'InstanceofOp'], ['LeftShiftOp', 'SignedRightShiftOp', 'UnsignedRightShiftOp'], ['PlusOp', 'SubtractOp'], ['MultiplyOp', 'DivideOp', 'RemOp'], ['UnaryPlusOp', 'UnaryNegateOp', 'LogicalNotOp', 'BitNotOp', 'DoOp', 'TypeofOp', 'PreIncrementOp', 'PreDecrementOp', 'DeleteOp', 'Undefined'], ['UnaryExistsOp', 'ShallowCopyArray', 'PostIncrementOp', 'PostDecrementOp', 'Spread'], ['NewOp'], ['MemberAccessOp', 'SoakedMemberAccessOp', 'DynamicMemberAccessOp', 'SoakedDynamicMemberAccessOp', 'ProtoMemberAccessOp', 'DynamicProtoMemberAccessOp', 'SoakedProtoMemberAccessOp', 'SoakedDynamicProtoMemberAccessOp']];
    precedence = {};
    (function() {
      var level, op, ops, _i, _len, _results;
      _results = [];
      for (level = _i = 0, _len = levels.length; _i < _len; level = ++_i) {
        ops = levels[level];
        _results.push((function() {
          var _j, _len1, _results1;
          _results1 = [];
          for (_j = 0, _len1 = ops.length; _j < _len1; _j++) {
            op = ops[_j];
            _results1.push(precedence[op] = level);
          }
          return _results1;
        })());
      }
      return _results;
    })();
    operators = {
      SeqOp: ';',
      LogicalOrOp: 'or',
      LogicalAndOp: 'and',
      BitOrOp: '|',
      BitXorOp: '^',
      BitAndOp: '&',
      EQOp: 'is',
      NEQOp: 'isnt',
      LTOp: '<',
      LTEOp: '<=',
      GTOp: '>',
      GTEOp: '>=',
      InOp: 'in',
      OfOp: 'of',
      InstanceofOp: 'instanceof',
      LeftShiftOp: '<<',
      SignedRightShiftOp: '>>',
      UnsignedRightShiftOp: '>>>',
      PlusOp: '+',
      SubtractOp: '-',
      MultiplyOp: '*',
      DivideOp: '/',
      RemOp: '%',
      UnaryPlusOp: '+',
      UnaryNegateOp: '-',
      LogicalNotOp: 'not ',
      BitNotOp: '~',
      DoOp: 'do ',
      NewOp: 'new ',
      TypeofOp: 'typeof ',
      PreIncrementOp: '++',
      PreDecrementOp: '--',
      UnaryExistsOp: '?',
      ShallowCopyArray: '[..]',
      PostIncrementOp: '++',
      PostDecrementOp: '--',
      Spread: '...',
      FunctionApplication: '',
      SoakedFunctionApplication: '?',
      MemberAccessOp: '.',
      SoakedMemberAccessOp: '?.',
      ProtoMemberAccessOp: '::',
      SoakedProtoMemberAccessOp: '?::',
      DynamicMemberAccessOp: '',
      SoakedDynamicMemberAccessOp: '?',
      DynamicProtoMemberAccessOp: '::',
      SoakedDynamicProtoMemberAccessOp: '?::'
    };
    return exports.generate = generate = function(ast, options) {
      var a, absNum, arg, args, hasElseBlock, i, isMultiline, needsParens, p, parameters, parent, parentClassName, prec, s, sep, src, usedAsExpression, _argList, _args, _assignee, _block, _body, _ctor, _elseBlock, _expr, _fn, _indexingExpr, _left, _op, _paramList, _ref, _ref1, _right;
      if (options == null) {
        options = {};
      }
      needsParens = false;
      if ((_ref = options.precedence) == null) {
        options.precedence = 0;
      }
      if ((_ref1 = options.ancestors) == null) {
        options.ancestors = [];
      }
      parent = options.ancestors[0];
      parentClassName = parent != null ? parent.className : void 0;
      usedAsExpression = (parent != null) && parentClassName !== 'Block';
      src = (function() {
        var _ref2, _ref3, _ref4, _ref5;
        switch (ast.className) {
          case 'Program':
            options.ancestors.unshift(ast);
            return generate(ast.block, options);
          case 'Block':
            options.ancestors.unshift(ast);
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
            isMultiline = _block.length > 90 || _elseBlock.length > 90 || (_elseBlock.indexOf('\n')) > -1 || (_block.indexOf('\n')) > -1;
            _block = isMultiline ? "\n" + (indent(_block)) : " then " + _block;
            if (hasElseBlock) {
              _elseBlock = isMultiline ? "\nelse\n" + (indent(_elseBlock)) : " else " + _elseBlock;
            }
            return "if " + (generate(ast.condition, options)) + _block + _elseBlock;
          case 'Identifier':
            return ast.data;
          case 'Null':
            return 'null';
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
          case 'String':
            return "'" + (formatStringData(ast.data)) + "'";
          case 'Function':
          case 'BoundFunction':
            options.ancestors.unshift(ast);
            options.precedence = precedence.AssignmentExpression;
            parameters = (function() {
              var _i, _len, _ref3, _results;
              _ref3 = ast.parameters;
              _results = [];
              for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
                p = _ref3[_i];
                _results.push(generate(p, options));
              }
              return _results;
            })();
            options.precedence = 0;
            _block = generate(ast.block, options);
            _paramList = ast.parameters.length > 0 ? "(" + (parameters.join(', ')) + ") " : '';
            _body = (function() {
              switch (ast.block.statements.length) {
                case 0:
                  return "";
                case 1:
                  return " " + _block;
                default:
                  return "\n" + (indent(_block));
              }
            })();
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
            options.precedence = prec;
            options.ancestors.unshift(ast);
            _assignee = generate(ast.assignee, options);
            _expr = generate(ast.expr, options);
            return "" + _assignee + " = " + _expr;
          case 'CompoundAssignOp':
            prec = precedence[ast.className];
            needsParens = prec < options.precedence;
            options.precedence = prec;
            options.ancestors.unshift(ast);
            _op = operators[ast.op.prototype.className];
            _assignee = generate(ast.assignee, options);
            _expr = generate(ast.expr, options);
            return "" + _assignee + " " + _op + "= " + _expr;
          case 'SeqOp':
            prec = precedence[ast.className];
            needsParens = prec < options.precedence;
            options.precedence = prec;
            options.ancestors.unshift(ast);
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
            if (((_ref3 = ast.className) === 'InOp' || _ref3 === 'OfOp' || _ref3 === 'InstanceofOp') && parentClassName === 'LogicalNotOp') {
              _op = "not " + _op;
            }
            prec = precedence[ast.className];
            needsParens = prec < options.precedence;
            options.precedence = prec;
            options.ancestors.unshift(ast);
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
              if ((_ref4 = ast.expr.className) === 'InOp' || _ref4 === 'OfOp' || _ref4 === 'InstanceofOp') {
                _op = '';
                prec = precedence[ast.expr.className];
              }
              if ('LogicalNotOp' === parentClassName || 'LogicalNotOp' === ast.expr.className) {
                _op = '!';
              }
            }
            needsParens = prec < options.precedence;
            if (parentClassName === ast.className && ((_ref5 = ast.className) === 'UnaryPlusOp' || _ref5 === 'UnaryNegateOp')) {
              needsParens = true;
            }
            options.precedence = prec;
            options.ancestors.unshift(ast);
            return "" + _op + (generate(ast.expr, options));
          case 'UnaryExistsOp':
          case 'PostIncrementOp':
          case 'PostDecrementOp':
          case 'Spread':
            _op = operators[ast.className];
            prec = precedence[ast.className];
            needsParens = prec < options.precedence;
            options.precedence = prec;
            options.ancestors.unshift(ast);
            _expr = generate(ast.expr, options);
            if (needsParensWhenOnLeft(ast.expr)) {
              _expr = parens(_expr);
            }
            return "" + _expr + _op;
          case 'NewOp':
            _op = operators[ast.className];
            prec = precedence[ast.className];
            options.precedence = prec;
            options.ancestors.unshift(ast);
            _ctor = generate(ast.ctor, options);
            if (ast["arguments"].length > 0 && needsParensWhenOnLeft(ast.ctor)) {
              _ctor = parens(_ctor);
            }
            options.precedence = precedence['AssignOp'];
            args = (function() {
              var _i, _len, _ref6, _results;
              _ref6 = ast["arguments"];
              _results = [];
              for (i = _i = 0, _len = _ref6.length; _i < _len; i = ++_i) {
                a = _ref6[i];
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
              _op = operators[ast.className];
              options.precedence = precedence[ast.className];
              options.ancestors.unshift(ast);
              _fn = generate(ast["function"], options);
              if (needsParensWhenOnLeft(ast["function"])) {
                _fn = parens(_fn);
              }
              args = (function() {
                var _i, _len, _ref6, _results;
                _ref6 = ast["arguments"];
                _results = [];
                for (i = _i = 0, _len = _ref6.length; _i < _len; i = ++_i) {
                  a = _ref6[i];
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
            options.precedence = prec;
            options.ancestors.unshift(ast);
            _expr = generate(ast.expr, options);
            if (needsParensWhenOnLeft(ast.expr)) {
              _expr = parens(_expr);
            }
            return "" + _expr + _op + ast.memberName;
          case 'DynamicMemberAccessOp':
          case 'SoakedDynamicMemberAccessOp':
          case 'DynamicProtoMemberAccessOp':
          case 'SoakedDynamicProtoMemberAccessOp':
            _op = operators[ast.className];
            prec = precedence[ast.className];
            needsParens = prec < options.precedence;
            options.precedence = prec;
            options.ancestors.unshift(ast);
            _expr = generate(ast.expr, options);
            if (needsParensWhenOnLeft(ast.expr)) {
              _expr = parens(_expr);
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
      })();
      if (needsParens) {
        return parens(src);
      } else {
        return src;
      }
    };
  })(typeof exports !== "undefined" && exports !== null ? exports : this.cscodegen = {});

}