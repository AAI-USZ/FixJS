function() {
    var defaultRules;

    defaultRules = [
      [
        Block, function(inScope, ancestors) {
          var canDropLast, stmts,
            _this = this;
          canDropLast = !this.usedAsExpression(ancestors);
          stmts = concat((function() {
            var i, s, _i, _len, _ref2, _results;
            _ref2 = _this.statements;
            _results = [];
            for (i = _i = 0, _len = _ref2.length; _i < _len; i = ++_i) {
              s = _ref2[i];
              switch (false) {
                case !((!s.mayHaveSideEffects(inScope)) && (canDropLast || i + 1 !== _this.statements.length)):
                  _results.push([declarationsFor(s.envEnrichments())]);
                  break;
                case !s["instanceof"](Block):
                  _results.push(s.statements);
                  break;
                case !s["instanceof"](SeqOp):
                  _results.push([s.left, s.right]);
                  break;
                default:
                  _results.push([s]);
              }
            }
            return _results;
          })());
          switch (stmts.length) {
            case 0:
              return (new Undefined).g();
            case 1:
              return stmts[0];
            default:
              return foldl1(stmts, function(expr, s) {
                return new SeqOp(expr, s);
              });
          }
        }
      ], [
        SeqOp, function(inScope, ancestors) {
          if (this.left.mayHaveSideEffects(inScope)) {
            if (this.right.mayHaveSideEffects() || this.usedAsExpression(ancestors)) {
              return this;
            } else {
              return this.left;
            }
          } else if ((this.right["instanceof"](Identifier)) && this.right.data === 'eval') {
            if ((this.left["instanceof"](Int)) && this.left.data === 0) {
              return this;
            }
            return new SeqOp((new Int(0)).g(), this.right);
          } else {
            return this.right;
          }
        }
      ], [
        AssignOp, function() {
          if (!this.expr["instanceof"](SeqOp)) {
            return this;
          }
          return new SeqOp(this.expr.left, new AssignOp(this.assignee, this.expr.right));
        }
      ], [
        While, function(inScope) {
          if (this.condition.isFalsey()) {
            if (this.condition.mayHaveSideEffects(inScope)) {
              return this.condition;
            } else {
              if (typeof block !== "undefined" && block !== null) {
                return declarationsFor(this.block.envEnrichments());
              } else {
                return (new Undefined).g();
              }
            }
          }
          if (this.condition.isTruthy()) {
            if (!this.condition.mayHaveSideEffects(inScope)) {
              if (this.block == null) {
                return (new Undefined).g();
              }
              if (this instanceof Loop) {
                return this;
              }
              return (new Loop(this.block)).g();
            }
          }
          return this;
        }
      ], [
        Conditional, function(inScope) {
          var block, removedBlock;
          if (this.condition.isFalsey()) {
            block = this.elseBlock;
            removedBlock = this.block;
          } else if (this.condition.isTruthy()) {
            block = this.block;
            removedBlock = this.elseBlock;
          } else {
            return this;
          }
          block = Block.wrap(block);
          if (removedBlock != null) {
            block.statements.unshift(declarationsFor(removedBlock.envEnrichments()));
          }
          if (this.condition.mayHaveSideEffects(inScope)) {
            this.condition.unshift(block);
          }
          return block;
        }
      ], [
        ForIn, function(inScope, ancestors) {
          var retVal;
          if (!((this.expr["instanceof"](ArrayInitialiser)) && this.expr.members.length === 0)) {
            return this;
          }
          retVal = this.usedAsExpression(ancestors) ? new ArrayInitialiser([]) : new Undefined;
          return new SeqOp(declarationsFor(this.envEnrichments()), retVal.g());
        }
      ], [
        ForOf, function() {
          var retVal;
          if (!((this.expr["instanceof"](ObjectInitialiser)) && this.expr.isOwn && this.expr.members.length === 0)) {
            return this;
          }
          retVal = this.usedAsExpression(ancestors) ? new ArrayInitialiser([]) : new Undefined;
          return new SeqOp(declarationsFor(this.envEnrichments()), retVal.g());
        }
      ], [
        ExistsOp, function() {
          if (this.left["instanceof"](Null, Undefined)) {
            return this.right;
          } else {
            return this;
          }
        }
      ], [
        LogicalNotOp, function() {
          switch (this.expr.className) {
            case Int.prototype.className:
            case Float.prototype.className:
            case String.prototype.className:
            case Bool.prototype.className:
              return (new Bool(!this.expr.data)).g();
            case Function.prototype.className:
            case BoundFunction.prototype.className:
              return (new Bool(false)).g();
            case Null.prototype.className:
            case Undefined.prototype.className:
              return (new Bool(true)).g();
            case ArrayInitialiser.prototype.className:
            case ObjectInitialiser.prototype.className:
              if (this.expr.mayHaveSideEffects()) {
                return this;
              } else {
                return new SeqOp(declarationsFor(this.expr.envEnrichments()), (new Bool(false)).g());
              }
              break;
            case LogicalNotOp.prototype.className:
              if (this.expr.expr["instanceof"](LogicalNotOp)) {
                return this.expr.expr;
              } else {
                return this;
              }
              break;
            default:
              return this;
          }
        }
      ], [
        TypeofOp, function() {
          switch (this.expr.className) {
            case Int.prototype.className:
            case Float.prototype.className:
            case UnaryNegateOp.prototype.className:
            case UnaryPlusOp.prototype.className:
              return (new String('number')).g();
            case String.prototype.className:
              return (new String('string')).g();
            case Function.prototype.className:
            case BoundFunction.prototype.className:
              return (new String('function')).g();
            case Undefined.prototype.className:
              return (new String('undefined')).g();
            default:
              return this;
          }
        }
      ]
    ];

    function Optimiser() {
      var ctor, ctors, handler, _i, _j, _k, _len, _len1, _ref2;
      this.rules = {};
      for (_i = 0, _len = defaultRules.length; _i < _len; _i++) {
        _ref2 = defaultRules[_i], ctors = 2 <= _ref2.length ? __slice.call(_ref2, 0, _j = _ref2.length - 1) : (_j = 0, []), handler = _ref2[_j++];
        for (_k = 0, _len1 = ctors.length; _k < _len1; _k++) {
          ctor = ctors[_k];
          this.addRule(ctor.prototype.className, handler);
        }
      }
    }

    Optimiser.prototype.addRule = function(ctor, handler) {
      var _base, _ref2;
      ((_ref2 = (_base = this.rules)[ctor]) != null ? _ref2 : _base[ctor] = []).push(handler);
    };

    Optimiser.prototype.optimise = function(ast) {
      var rules;
      rules = this.rules;
      return ast.walk(function(inScope, ancestry) {
        var memo, rule, _i, _len, _ref2, _ref3;
        memo = this;
        _ref3 = (_ref2 = rules[this.className]) != null ? _ref2 : [];
        for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
          rule = _ref3[_i];
          memo = rule.call(memo, inScope, ancestry);
        }
        return memo;
      });
    };

    return Optimiser;

  }