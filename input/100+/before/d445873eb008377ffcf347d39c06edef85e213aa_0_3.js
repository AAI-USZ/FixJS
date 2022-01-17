function(e){
	var x;
	var y;
	if (e.pageX != undefined && e.pageY != undefined){
		x = e.pageX;
		y = e.pageY;
	}else{
		x = e.clientX + document.body.scrollLeft + document.body.scrollLeft +document.documentElement.scrollLeft;
		y = e.clientY + document.body.scrollTop + document.body.scrollTop +document.documentElement.scrollTop;
	}

	var target = e.target
	while(target){
		x -= target.offsetLeft;
		y -= target.offsetTop;
		target = target.offsetParent;
	}
	this.cursor = {x:x, y:y};
}