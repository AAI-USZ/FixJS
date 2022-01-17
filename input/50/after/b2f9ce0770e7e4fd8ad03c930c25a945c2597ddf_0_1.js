function(unexpected) {
    var args = this.parameter;
    this.current_callback = function(sbj) {
      return sbj.when_apply.apply(sbj, args).not_to_be(unexpected);
    }
    return this;
  }