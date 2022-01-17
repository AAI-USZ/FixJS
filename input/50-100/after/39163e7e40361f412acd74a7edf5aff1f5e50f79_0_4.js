function(el) {
    if (!el) throw 'The target container doesn\'t exist';
    else if (el.graph instanceof Graph) el.graph.destroy();
    else if (!el.clientWidth) throw 'The target container must be visible';

    el.graph = this;
    this.el = el;
  }