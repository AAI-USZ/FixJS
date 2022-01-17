function Timeline(location, length, viewlength) {
		var canvas = document.createElement('canvas'),
			overlay = document.createElement('canvas'),
			node = document.createElement('div');
		
		this.length = length; // In seconds
		this.view = new timelineView(this);
			this.view.length = viewlength;
			this.view.width = window.innerWidth;
			
		this.events = {};
		this.tracks = [];
		this.audio = [];
		this.trackIndices = {};
		this.kTracks = 0;
		
		this.activeElement = null;
		this.segmentPlaceholder = null;
		this.selectedSegment = null;
		this.selectedTrack = null;
		this.currentSegments = [];
		
		this.slider = new Slider(this);
			this.sliderActive = false;
		
		this.toolbar = null;
		
		this.tracker = new TimelineTracker(this);
		
		this.timeMarkerPos = 0;
		this.direction = $(location).css("direction");
		this.repeatA = null;
		this.repeatB = null;
		this.abRepeatOn = false;
	  
		// Sizing
		this.height = this.keyHeight + this.segmentTrackPadding + this.sliderHeight;
		
		//cursor & tool selection
		this.currentTool = Timeline.SELECT;
		
		// Canvas
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');	
		this.overlay = overlay;
		this.octx = overlay.getContext('2d');
		canvas.addEventListener('mousemove', mouseMove.bind(this), false);
		canvas.addEventListener('mouseup', mouseUp.bind(this), false);
		canvas.addEventListener('mousedown', mouseDown.bind(this), false);
		
		//put stuff on the page
		canvas.height = this.height;
		canvas.width = window.innerWidth;
		overlay.height = this.height;
		overlay.width = window.innerWidth;
		overlay.style.position = "absolute";
		overlay.style.top = 0;
		overlay.style.left = 0;
		overlay.style.pointerEvents = "none";
		window.addEventListener("resize", windowResize.bind(this), false);
		
		node.style.position = "relative";
		node.appendChild(canvas);
		node.appendChild(overlay);
		location.appendChild(node);
	}