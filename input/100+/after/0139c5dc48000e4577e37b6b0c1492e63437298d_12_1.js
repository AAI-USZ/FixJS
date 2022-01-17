function merge(other) {
    if (other && other !== this) {
      Array.prototype.push.apply(this.variables, other.variables);
      /* We want a priority that reflects the variables' definition order. */
      this.priority = this.variables.slice();
      this.priority.sort(definedLater);
      other.variables.forEach(function (vvv) {
        vvv.outer.solver = this;
      }, this);
      other.variables = [];

      Array.prototype.push.apply(this.constraints, other.constraints);
      other.constraints = [];

      /* Have to do it this way so we don't add stay constraints. They will be
       * added on solve. */
      Array.prototype.push.apply(this.unenforcedCnsQueue, other.unenforcedCnsQueue);
      LOG("Merged two constraint graphs.");
    }
  }