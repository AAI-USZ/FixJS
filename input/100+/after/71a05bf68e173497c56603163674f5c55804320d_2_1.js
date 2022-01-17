function(content) {
    //TODO: move to constants
    var x = constants.WIDTH * 0.2;
    var y = constants.HEIGHT * 0.7;

    if (this.invalidText) {
      this.invalidText.attr({'text': content});
    } else {
      this.invalidText = this.getCanvas().text(x, y, content);
      this.invalidText.attr({'fill' : '#f00', 'font-size' : '22', 'font-family' : conf.font, 'font-weight' : 'bold','stroke-width' : '1'});
    }
    this.invalidText.hide();
    this.queueAnimate(this.invalidText, {'opacity': 1}, 100); 
  }