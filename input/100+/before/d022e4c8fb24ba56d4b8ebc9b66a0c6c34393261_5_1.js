function Timeline(location, length, viewlength) {
		var canvas = document.createElement('canvas');
			
		timelineGlobal = this;
		
		/**
		 * Timeline Properties
		 *
		 * These properties control everything about the timeline. They are divied into four (4) major sections:
		 *  1. Functional - These deal with how it functions, the objects it contains, its size, etc.
		 *  2. Sizing - These deal with the sizes of the elements. Customization can start here.
		 *  3. Coloring - These deal with the colors of the timeline.
		 *  4. Images - These are the images used in rendering.
		 *
		 * Author: Joshua Monson
		 **/
		this.length = length; // In ms
		this.view = new timelineView(this);
			this.view.length = Math.round(viewlength);
			this.view.width = window.innerWidth;
			
		this.events = {};
		this.tracks = [];
		this.trackIndices = {};
		this.kTracks = 0;
		this.misc = [];
		
		this.activeElement = null;
		this.selectedSegment = null;
		this.currentSegments = [];
		
		this.slider = new Slider(this);
			this.sliderActive = false;
		
		this.toolbar = null;
		this.segmentPlaceholder = null;
		
		this.tracker = new TimelineTracker(this);
		
		this.timeMarkerPos = 0;
		this.direction = $(location).css("direction");
		this.repeatA = null;
		this.repeatB = null;
		this.abRepeatOn = false;
	  
		// Sizing
		this.height = this.keyHeight + this.segmentTrackPadding + this.sliderHeight;

		// Load the images
		this.loadImages();
		
		// Canvas
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');		
		canvas.addEventListener('mousemove', mouseMove.bind(this), false);
		canvas.addEventListener('mouseup', mouseUp.bind(this), false);
		canvas.addEventListener('mousedown', mouseDown.bind(this), false);
		
		//put stuff on the page
		canvas.height = this.height;
		canvas.width = window.innerWidth;
		window.addEventListener("resize", windowResize.bind(this), false);
		location.appendChild(canvas);
	}