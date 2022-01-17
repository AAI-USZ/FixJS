function(toAdd, loops){
    while (loops.length) {
      toAdd = loops.pop().addBody(Block(toAdd));
    }
    return this.addBody(Block(toAdd));
  }