function(pos) {
    var tip = this.tip, 
        style = tip.style, 
        cont = this.config;
    style.display = '';
    //get viewport dimensions
    var elem = document.compatMode === "CSS1Compat" && document.documentElement ||
               document.body ||
               document.documentElement;
    var view = {
      'width': elem.clientWidth,
      'height': elem.clientHeight,
      'x': window.pageXOffset ||
           document.documentElement && document.documentElement.scrollLeft ||
           document.body && document.body.scrollLeft ||
           0,
      'y': window.pageYOffset ||
           document.documentElement && document.documentElement.scrollTop ||
           document.body && document.body.scrollTop ||
           0
    };
    //get tooltip dimensions
    var obj = {
      'width': tip.offsetWidth,
      'height': tip.offsetHeight  
    };
    //set tooltip position
    var x = cont.offsetX, y = cont.offsetY;
    style.top = ((pos.y + obj.height + y > view.height + view.y)?
        (pos.y - obj.height - y) : pos.y + y) + 'px';
    style.left = ((pos.x + obj.width + x > view.width + view.x)?
        (pos.x - obj.width - x) : pos.x + x) + 'px';
  }