function(e){
      if (e === null) var e = window.event;
      var resizeX =_lastX - e.clientX;
      var resizeY = _lastY - e.clientY;
      var curHeight = kb.html.offsetHeight - 4;
      var curWidth = kb.html.offsetWidth-4;
      var leftWidth = kb.position.left? kb.position.left.offsetWidth-2:null;
      if(resizingL){
	if(kb.position.left.style.width){
	  kb.position.left.style.width = leftWidth + resizeX/2 + 'px';
	  if(kb.position.right){
	    kb.position.right.style.width = curWidth - (leftWidth+resizeX/2)+'px';
	  }
	}
	kb.html.style.left = (_offsetX + e.clientX - _startX) + 'px';
	kb.html.style.width = curWidth + resizeX + 'px';
	kb.resizeHeight();
      }
      if(resizingR){
	if(kb.position.left.style.width){
	  kb.position.left.style.width = leftWidth - resizeX/2 + 'px';
	  if(kb.position.right){
	    kb.position.right.style.width = curWidth - (leftWidth-resizeX/2)+'px';
	  }
	}
	kb.html.style.width = curWidth - resizeX + 'px';
	kb.resizeHeight();
      }
      if(resizingB){
	kb.html.style.height = curHeight - resizeY + 'px';
      }
      if(resizingM){
	kb.position.left.style.width = leftWidth - resizeX + 'px';
	if(kb.position.right){
	  kb.position.right.style.width = curWidth - (leftWidth-resizeX)+'px';
	}
	kb.resizeHeight();
      }
      if(middleResize !== undefined){
	middleResize.style.left = kb.position.left.offsetWidth+'px';
      }
      _lastX = e.clientX;
      _lastY = e.clientY;
    }