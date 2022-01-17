function Timeline(location, params) {
		if(!(location instanceof HTMLElement)){ throw new Error("Invalid DOM Insertion Point"); }
		if(!params){ params = {}; }
		var canvas = document.createElement('canvas'),
			overlay = document.createElement('canvas'),
			node = document.createElement('div'),
			fonts = params.fonts || new Timeline.Fonts({}),
			colors = params.colors || new Timeline.Colors({}),
			images = params.images || new Timeline.Images({}),
			cursors = params.cursors || new Timeline.Cursors({}),
			width = params.width || location.offsetWidth,
			length = params.length || 1800;
			
		Object.defineProperties(this,{
			fonts: {
				get: function(){ return fonts; },
				set: function(obj){ fonts = obj; this.render(); },
				enumerable:true
			},colors: {
				get: function(){ return colors; },
				set: function(obj){ colors = obj; this.render(); },
				enumerable:true
			},images: {
				get: function(){ return images; },
				set: function(obj){ images = obj; this.render(); },
				enumerable:true
			},cursors: {
				get: function(){ return cursors; },
				set: function(obj){ cursors = obj; this.render(); },
				enumerable:true
			},length: { // In seconds
				get: function(){ return length; },
				set: function(val){
					if(val != length){
						length = val;
						this.render();
					}
					return length;
				},enumerable:true
			},width: { // In pixels
				get: function(){ return width; },
				set: function(val){
					var id;
					if(val != width){
						width = +val;
						canvas.width = width;
						overlay.width = width;
						for(id in this.audio){
							this.audio[id].width = width;
						}
						// Re-render the timeline
						this.render();
					}
					return width;				
				},enumerable: true
			}
		});
			
		this.events = {};
		this.tracks = [];
		this.audio = {};
		this.trackIndices = {};
		
		this.activeElement = null;
		this.selectedSegment = null;
		this.currentSegments = [];
		this.sliderActive = false;
		
		this.slider = new Timeline.Slider(this);
		this.tracker = new Timeline.Tracker(this);
		this.persistence = new Timeline.Persistence(this);
		this.view = new Timeline.View(this, params.start || 0, params.end || 60);
		
		this.timeMarkerPos = 0;
		this.repeatA = null;
		this.repeatB = null;
		this.abRepeatOn = false;
	  
		// Sizing
		this.height = this.keyHeight + this.trackPadding + this.sliderHeight;
		
		//cursor & tool selection
		this.currentTool = Timeline.SELECT;
		
		//mouse control
		this.mouseDownPos = {x: 0, y: 0};
		this.scrollInterval = null;
		this.sizeInterval = null;
		this.renderInterval = null;
		
		// Canvas
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		canvas.width = width;
		canvas.height = this.height;
		canvas.addEventListener('mousemove', mouseMove.bind(this), false);
		canvas.addEventListener('mouseup', mouseUp.bind(this), false);
		canvas.addEventListener('mouseout', mouseUp.bind(this), false);
		canvas.addEventListener('mousedown', mouseDown.bind(this), false);
		
		this.overlay = overlay;
		this.octx = overlay.getContext('2d');
		overlay.width = width;
		overlay.height = this.height;
		overlay.style.position = "absolute";
		overlay.style.top = 0;
		overlay.style.left = 0;
		overlay.style.pointerEvents = "none";

		node.style.position = "relative";
		node.appendChild(canvas);
		node.appendChild(overlay);
		location.appendChild(node);
		
		this.render();
	}