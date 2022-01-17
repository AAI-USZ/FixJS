function(startPos, element) {
    var pos = startPos || dojo.position(this.scroller.wrapper),
        offsetX = 25, offsetY = 5;
        topEle = element || (document.elementFromPoint(pos.x + offsetX, pos.y + offsetY)),
        topElePos = dojo.position(topEle);
    console.log(topEle, topElePos, topElePos.y >= pos.y);
    if (topElePos.y >= pos.y) {
      return topEle;
    }



  }