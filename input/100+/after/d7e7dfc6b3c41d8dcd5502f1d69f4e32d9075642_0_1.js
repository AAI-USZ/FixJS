function(divName)
{
	this.offset = 0;
	this.numBases = 100000;
	
	this.c_length = 1000000;
	
	this.lastDraw = 0;
	
	this.start = 0;
	this.end = 0;
	
	this.tracks = {};
	
	this.labelWidth = 40.0;
	
	var div = $(document.getElementById(divName));
	
	var w = div.innerWidth() - 25;
	var h = 200;
	
	div.append('<canvas id='+ divName + '_Viewer width="'+w+'" height="'+h+'" class="bragv_canvas"></canvas>');
	
	this.ctx = $('canvas', div)[0].getContext('2d');
	
	this.baseWidth = (w - this.labelWidth) / this.numBases;
	this.trackWidth = w - this.labelWidth;
	
	this.horizontalScroller = new BRAGV.Scroller(divName, 'h');
	this.horizontalScroller.step = 1;
	this.verticalScroller = new BRAGV.Scroller(divName, 'v');
	this.verticalScroller.step = 20;
	var vwr = this;
	
	this.horizontalScroller.onValueChange = function(val)
	{
		
		vwr.setOffset(val);
	};
	
	this.verticalScroller.onValueChange = function(val)
	{
		vwr.setZoom(val);
	};
	/*if(debug)
	{
		this.tracks["track1"] = new BRAGV.Track();
		this.tracks["track2"] = new BRAGV.Track();
		this.tracks["track3"] = new BRAGV.Track();
		this.tracks["track4"] = new BRAGV.Track();
		this.tracks["track5"] = new BRAGV.Track();
		this.tracks["track6"] = new BRAGV.Track();
	}*/
	this.verticalScroller.setValue(80);
}