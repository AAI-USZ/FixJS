function(e){
      if (e === null) var e = window.event;
      var resizeX =_lastX - e.clientX;
      var resizeY = _lastY - e.clientY;
      var curHeight = kb.html.offsetHeight - 4;
      var curWidth = kb.html.offsetWidth-4;
      var leftWidth = kb.position.left.offsetWidth-2;
      if(resizingL){
	kb.html.style.left = (_offsetX + e.clientX - _startX) + 'px';
	kb.html.style.width = curWidth + resizeX + 'px';
      }
      if(resizingR){
	kb.html.style.width = curWidth - resizeX + 'px';
      }
      if(resizingB){
	kb.html.style.height = curHeight - resizeY + 'px';
      }
      if(resizingT){
	kb.html.style.top = (_offsetY + e.clientY - _startY) + 'px';
	kb.html.style.height = curHeight + resizeY + 'px';
      }
      if(resizingM){
	kb.position.left.style.width = leftWidth - resizeX + 'px';
	if(kb.position.right){
	  kb.position.right.style.width = curWidth - (leftWidth-resizeX)+'px';
	}
      }
      if(middleResize !== undefined){
	middleResize.style.left = kb.position.left.offsetWidth+'px';
      }
      _lastX = e.clientX;
      _lastY = e.clientY;
    }