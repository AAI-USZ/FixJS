function getMousePos(canvas, evt){
	var obj = canvas;
	var top = 0;
	var left = 0;
	while(obj && obj.tagName != 'BODY'){
		top += obj.offsetTop;
		left += obj.offsetLeft;
		obj = obj.offsetParent;
	}

	var mouseX = evt.clientX - left + window.pageXOffset;
	var mouseY = evt.clientY - top + window.pageYOffset;
	return {
		x: mouseX,
		y: mouseY
	};
}