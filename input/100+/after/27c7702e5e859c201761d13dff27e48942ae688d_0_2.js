function (args) {
	var t = this, args = args || {};
	if (t === window) {
		throw 'You must use the `new` keyword when calling a Constructor Method!';
	}

	t.debug = args.debug || false;
	t.mpos = {x: 0,y: 0};
	t.camera = args.camera || new NPos3d.Camera();
	t.frameRate = args.frameRate || 30;
	t.pixelScale = args.pixelScale || 1;
	t.globalCompositeOperation = args.globalCompositeOperation || 'source-over';
	t.backgroundColor = args.backgroundColor || 'transparent';
	t.lineWidth = args.lineWidth || undefined;
	t.fullScreen = args.fullScreen === undefined || args.fullScreen === true ? true : false;
	console.log(t.fullScreen);

	t.isMobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));

	t.canvasId = args.canvasId || 'canvas';
	t.canvas = args.canvas || document.createElement('canvas');
	t.canvas.id = t.canvasId;
	t.c = t.canvas.getContext('2d');
	if (args.canvas === undefined) {
		document.body.appendChild(t.canvas);
	}
	if (t.fullScreen) {
		t.canvas.parentNode.style.margin = 0;
		t.canvas.parentNode.style.padding = 0;
		t.canvas.style.display = 'block';
		t.canvas.style.top = 0;
		t.canvas.style.left = 0;
		t.canvas.style.zIndex = args.zIndex ||-10;
		if (t.isMobile) {
			t.checkWindow = function () {
				t.w = Math.ceil(window.outerWidth / t.pixelScale);
				t.h = Math.ceil(window.outerHeight / t.pixelScale);
			};
		} else {
			t.checkWindow = function () {
				t.w = Math.ceil(window.innerWidth / t.pixelScale);
				t.h = Math.ceil(window.innerHeight / t.pixelScale);
			};
		}
	} else {
		t.checkWindow = function () {
			t.w = Math.ceil(t.canvas.width / t.pixelScale);
			t.h = Math.ceil(t.canvas.height / t.pixelScale);
		};
		if (t.canvas.width == '') { t.canvas.width = args.width || 512; }
		if (t.canvas.height == '') { t.canvas.height = args.height || 384; }
	}
	if (t.pixelscale !== 1) {
		t.canvas.style.imageRendering = '-moz-crisp-edges';
		t.canvas.style.imageRendering = '-webkit-optimize-contrast';
		//reference: http://stackoverflow.com/questions/10525107/html5-canvas-image-scaling-issue
		t.c.imageSmoothingEnabled = false;
		t.c.mozImageSmoothingEnabled = false;
		t.c.webkitImageSmoothingEnabled = false;
	}else if (!isMobile) {
		t.canvas.style.position = 'fixed';
	}
	//console.log(isMobile);

	t.checkWindow();
	t.resize();
	t.setInvertedCameraPos();

	//t.canvas.style.width=  t.w + 'px';
	//t.canvas.style.height= t.h + 'px';
	t.canvas.style.backgroundColor = '#000';
	t.cursorPosition = args.canvas !== undefined ? 'absolute' : 'relative';
	t.mouseHandler = function (e) {
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
			if(t.cursorPosition === 'absolute'){
				t.mpos.x = Math.ceil(((e.touches[0].screenX - canvasOffset.x) / t.pixelScale) - t.cx);
				t.mpos.y = Math.ceil(((e.touches[0].screenY - canvasOffset.y) / t.pixelScale) - t.cy);
			}else{
				t.mpos.x = Math.ceil((e.touches[0].screenX / t.pixelScale) - t.cx);
				t.mpos.y = Math.ceil((e.touches[0].screenY / t.pixelScale) - t.cy);
			}
		} else {
			//t.mpos.x = e.pageX - t.cx;
			//t.mpos.y = e.pageY - t.cy;
			if(t.cursorPosition === 'absolute'){
				t.mpos.x = Math.ceil(((e.clientX - canvasOffset.x) / t.pixelScale) - t.cx);
				t.mpos.y = Math.ceil(((e.clientY - canvasOffset.y) / t.pixelScale) - t.cy);
			}else{
				t.mpos.x = Math.ceil((e.clientX / t.pixelScale) - t.cx);
				t.mpos.y = Math.ceil((e.clientY / t.pixelScale) - t.cy);
			}
		}
	}
	window.addEventListener('mousemove',t.mouseHandler,false);
	window.addEventListener('touchstart',t.mouseHandler,false);
	window.addEventListener('touchmove',t.mouseHandler,false);
	//window.addEventListener('touchend',t.mouseHandler,false);
	//console.log(window.innerHeight, window.outerHeight);

	t.rQ = [];//RenderQueue
	t.cro = 0;//CurrentlyRenderingObject

	t.start();
	t.globalize();
	return this;
}