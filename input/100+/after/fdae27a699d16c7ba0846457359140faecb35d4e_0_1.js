function(startPos, element) {
    if (!this.scroller) { return; }
    var pos = startPos || dojo.position(this.scroller.wrapper),
        offsetX = 25, offsetY = 5;
        topEle = element || (document.elementFromPoint(pos.x + offsetX, pos.y + offsetY)),
        topElePos = dojo.position(topEle);
    console.log(topEle, topElePos, topElePos.y >= pos.y);
    if (topElePos.y >= pos.y) {
      return topEle;
    }
    var nextEle = topEle.nextSibling ? topEle.nextSibling : topEle.parentNode;

    if (nextEle === this.scroller.scroller) {
      return;
    }

    return this._getReadingTarget(pos, nextEle);
  }