function(subscript, x, y) {
    var self = this;
    console.debug("drawSubText: " + subscript);

    var subText = this.repository.findElement("subText","text");
    if (subText) {
      subText.attr({'text': subscript});
    } else {
      subText = this.getCanvas().text(x, y, subscript);
      subText.attr({'fill' : '#fff', 'font-size' : '16', 'font-family' : conf.font, 'font-weight' : 'bold','stroke-width' : '1'});
      this.repository.addElement(subText, "subText", "text");
    }
    subText.hide();
    this.queueAnimate(subText, {'opacity': 1}, 100); 
  }