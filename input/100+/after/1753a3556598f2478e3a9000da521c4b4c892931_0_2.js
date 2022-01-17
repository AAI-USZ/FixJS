function (e) {
        var height = kb.html.offsetHeight-4;
        if (e === null) {
            e = window.event;
        }
        kb.html.style.width = kb.html.offsetWidth-4+'px';
        resizingL=e.target===leftResize;
        resizingR=e.target===rightResize;
        resizingB=e.target===bottomResize;
        
        resizingM=e.target===middleResize;
	draggingBar = e.target===kbtoolbar;
        var target = e.target !== null ? e.target : e.srcElement;
        if ((e.button === 1 && window.event !== null || e.button === 0) && (draggingBar||resizingL||resizingR||resizingB||resizingM)) {
            _startX = e.clientX;
            _startY = e.clientY;
            _offsetX = extractNumber(kb.html.style.left);
            _offsetY = extractNumber(kb.html.style.top);
	    _lastX = e.clientX;
	    _lastY = e.clientY;
            _oldZIndex = kb.html.style.zIndex;
	    if(draggingBar){
	      kb.html.style.height = height + 'px';
	      document.onmousemove =kb.OnMouseMove;
	    }
	    else{
	      document.onmousemove =kb.Resize;
	    }
            kb.html.style.zIndex = 10000;
            isDragging = true;
            document.body.focus();
            document.onselectstart = function () {
                return false;
            };
            target.ondragstart = function () {
                return false;
            };
            return false;
        }
    }