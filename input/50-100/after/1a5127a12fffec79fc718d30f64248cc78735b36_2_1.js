function(content, subscript) {
    var x = constants.WIDTH * 0.78;
    var y = constants.HEIGHT * 0.7;

    this.drawMainText(content, x, y);

    var newLineCount = this.countNewLines(content);
    var subY = y + (newLineCount*36);
    this.drawSubText(subscript, x, subY);
  }