function() {
          var newNode;
          newNode = (function() {
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
                  return (new Bool(false)).g();
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
          }).call(this);
          if (newNode === this) {
            return this;
          }
          return newNode.r(this.raw).p(this.line, this.column);
        }