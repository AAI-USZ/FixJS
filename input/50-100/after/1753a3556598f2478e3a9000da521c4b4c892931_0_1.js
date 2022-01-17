function (e) {
        if (isDragging) {
	  resizingL=false;
	  resizingR=false
	  resizingB=false;
	  resizingM=false;
	  if(!draggingBar){
	    kb.resizeHeight();
	  }
	  kb.html.style.zIndex = _oldZIndex;
	  kb.html.focus();
	  document.onmousemove = null;
	  document.onselectstart = null;
	  isDragging = false;
	  isDragged = true;
        }
    }