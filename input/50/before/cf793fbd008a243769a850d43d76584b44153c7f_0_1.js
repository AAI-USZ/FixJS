function(toAdd, loops){
    var toAdd;
    while (loops.length) {
      toAdd = loops.pop().addBody(Block(toAdd));
    }
    return this.addBody(Block(toAdd));
  }