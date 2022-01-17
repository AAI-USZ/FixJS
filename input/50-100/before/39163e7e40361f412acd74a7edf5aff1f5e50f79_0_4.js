function(el) {
    if (!el) throw 'The target container doesn\'t exist';
    if (!el.clientWidth) throw 'The target container must be visible';
    this.el = el;

    if (this.el.graph) this.el.graph.destroy();

    this.el.graph = this;
  }