function() {
      var _ref;
      return {
        nodeType: this.className,
        isOwn: this.isOwn,
        keyAssignee: this.keyAssignee.toJSON(),
        valAssignee: (_ref = this.valAssignee) != null ? _ref.toJSON() : void 0,
        expression: this.expr.toJSON(),
        filterExpression: this.filterExpr.toJSON(),
        block: this.block.toJSON()
      };
    }