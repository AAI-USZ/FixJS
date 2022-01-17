function (parent) {
    while (parent.sprites.length > 0) {
      parent.sprites[0].remove();
    }
  }