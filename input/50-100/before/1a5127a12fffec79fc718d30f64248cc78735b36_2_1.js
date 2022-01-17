function(content, subscript) {
    //TODO: move to constants
    var x = constants.WIDTH * 0.78;
    var y = constants.HEIGHT * 0.7;

    this.drawMainText(content, x, y);

    var newLineCount = this.countNewLines(content);
    var subY = y + (newLineCount*36);
    console.debug("subY"+ subY);
    this.drawSubText(subscript, x, subY);
  }