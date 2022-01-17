function(){



	this.canvas;

	

	function _init(){

		

	

		this.canvas = new fabric.Canvas('mainCanvas');		

		

		_observeCanvas();

		

	}

	

	function _observeCanvas(){

		

		mainCanvas.canvas.observe({ 

			  'object:moving': updateControls,

			  'object:scaling': updateControls,

			  'object:resizing': updateControls,

			  'object:selecting' : function(){alert('eco');}

			});

		

		function updateControls() {

			

			rightUpperSlidder.positionXSlidder.value(mainCanvas.canvas.getActiveObject().getLeft());

			rightUpperSlidder.positionYSlidder.value(mainCanvas.canvas.getActiveObject().getTop());

			rightUpperSlidder.scaleXSlidder.value(mainCanvas.canvas.getActiveObject().getScaleX()*100);

			rightUpperSlidder.scaleYSlidder.value(mainCanvas.canvas.getActiveObject().getScaleY()*100);

			rightUpperSlidder.angleSlidder.value(mainCanvas.canvas.getActiveObject().getAngle());

			

			

			/*

			  scaleControl.value = rect.getScaleX();

			  angleControl.value = rect.getAngle();

			  leftControl.value = rect.getLeft();

			  topControl.value = rect.getTop();*/

			}		

		

	}

	

	function _addLocalImage(url,f_callback){

		

		var oImg;

		fabric.Image.fromURL(url,function(img) {

			  oImg = img.set({ left: 300, top: 240}).scale(1);

			  mainCanvas.canvas.add(oImg).renderAll();

			  f_callback(oImg);			  

		});

		

	}

	

	function _none(){

		var $ = function(id){return document.getElementById(id)};

		

		var angleControl = $('angle-control');

		angleControl.onchange = function() {

		  rect.setAngle(this.value).setCoords();

		  canvas.renderAll();

		};

		

		var scaleControl = $('scale-control');

		scaleControl.onchange = function() {

		  rect.scale(this.value).setCoords();

		  canvas.renderAll();

		};

		

		var topControl = $('top-control');

		topControl.onchange = function() {

		  rect.setTop(this.value).setCoords();

		  canvas.renderAll();

		};

		

		var leftControl = $('left-control');

		leftControl.onchange = function() {

		  rect.setLeft(this.value).setCoords();

		  canvas.renderAll();

		};

		

		

	}

	

	this.init = _init;

	this.addLocalImage = _addLocalImage;

}