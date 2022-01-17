function () {
		var t = this;
		t.cx = Math.floor(t.w/2);
		t.cy = Math.floor(t.h/2);
		t.mpos.x = 0;
		t.mpos.y = 0;
		t.canvas.width = t.w;
		t.canvas.height = t.h;
		if (t.pixelScale !== 1) {
			t.canvas.style.width = t.w*t.pixelScale + 'px';
			t.canvas.style.height = t.h*t.pixelScale + 'px';
		}
		t.lw = t.w;
		t.lh = t.h;
		//Normally, this function would end here,
		//but both FireFox and "Web" for Android refuse to allow me to display pages pixel-per-pixel in any sane way.
		//This does 3 things -
		//	1: Make the canvas very, very large, which kills performance
		//	2: Make the render output SUCK
		//	3: HULK SMASH!!!
		var meta = document.getElementById('vp');
		if (!meta) {
			var meta = document.createElement('meta');
			meta.setAttribute('name','viewport');
			meta.setAttribute('id','vp');
		}
		if (meta && meta.parentNode === document.head) {
			document.head.removeChild(meta);
		}
		//var oldSize = subset(window,'innerHeight,innerWidth,outerWidth,outerHeight');
		meta.setAttribute('content','width=' + t.w + ', user-scalable=0, target-densityDpi=device-dpi');
		document.head.appendChild(meta);
		document.body.style.height = t.h.toString() + 'px';
		if(t.isMobile){
			window.scrollTo(0,1);
		}
		//window.scrollTo(0,0);
		//displayDebug(oldSize);
		//displayDebug(document.body.style);
	}