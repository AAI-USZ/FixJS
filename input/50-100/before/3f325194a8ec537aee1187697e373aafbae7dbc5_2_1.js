function(open) {
    dojo[ open ? 'addClass' : 'removeClass' ](this.domNode, 'open');
    this.open = open;
  }