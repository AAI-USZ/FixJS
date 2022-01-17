function (e) {
		//console.dir(e);
		//displayDebug(e.target);
		if(e.target === t.canvas || e.target === window){
			e.preventDefault();
		}
		var canvasOffset = {x: 0,y: 0};
		if (!t.fullscreen) {
			var offset = t.canvas.getBoundingClientRect();
			canvasOffset.x = offset.left;
			canvasOffset.y = offset.top;
		}
		if (e.touches && e.touches.length) {
			//t.mpos.x = e.touches[0].screenX - t.cx;
			//t.mpos.y = e.touches[0].screenY - t.cy;
			t.mpos.x = Math.ceil(((e.touches[0].screenX - canvasOffset.x) / t.pixelScale) - t.cx);
			t.mpos.y = Math.ceil(((e.touches[0].screenY - canvasOffset.y) / t.pixelScale) - t.cy);
		} else {
			//t.mpos.x = e.pageX - t.cx;
			//t.mpos.y = e.pageY - t.cy;
			t.mpos.x = Math.ceil(((e.clientX - canvasOffset.x) / t.pixelScale) - t.cx);
			t.mpos.y = Math.ceil(((e.clientY - canvasOffset.y) / t.pixelScale) - t.cy);
		}
	}