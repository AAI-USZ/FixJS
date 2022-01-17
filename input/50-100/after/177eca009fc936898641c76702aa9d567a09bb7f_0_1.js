function() {
      var _ref, _ref1;
      return {
        nodeType: this.className,
        isOwn: this.isOwn,
        keyAssignee: this.keyAssignee.toJSON(),
        valAssignee: (_ref = this.valAssignee) != null ? _ref.toJSON() : void 0,
        expression: this.expr.toJSON(),
        filterExpression: (_ref1 = this.filterExpr) != null ? _ref1.toJSON() : void 0,
        block: this.block.toJSON()
      };
    }