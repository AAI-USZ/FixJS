function(divName)
{
	this.offset = 0;
	this.numBases = 100000;
	/**
	 * The length of the chromosome
	 */
	this.c_length = 1000000;
	
	this.lastDraw = 0;
	
	this.start = 0;
	this.end = 0;
	
	this.tracks = {};
	this.trackIndex = [];
	
	this.labelWidth = 40.0;
	this.selectedColour = 'rgba(0, 0, 255, 1)';
	
	/**
	 * The first base in the selection (Null if no bases are selected)
	 */
	this.firstSelectedBase = null;
	/**
	 * The last base in the selection (Null if no bases are selected)
	 */
	this.lastSelectedBase = null;
	
	var div = $(document.getElementById(divName));
	
	var w = div.innerWidth() - 25;
	var h = 200;
	
	/**
	 * An array containing the track id and the index of the selected feature;
	 */
	this.selectedFeature = [null, null];
	
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
	this.verticalScroller.setValue(100);
	
	div.click(function(evt){
		var x = evt.offsetX;
		var y = evt.offsetY;
		
		console.debug(x + ',' + y + ' :: ' + vwr.labelWidth + ', 20') ;
		
		if(x > vwr.labelWidth && y > 23)
		{
			var t = y/23;
			t = t - (t%1) -1;
			if(t >= vwr.trackIndex.length) return;
			console.debug('track ' + t + ' :: ' + vwr.trackIndex[t]);
			
			/*var b = x - vwr.labelWidth;
			b = b / vwr.baseWidth;
			b = b - (b%1);
			b = b + vwr.offset;
			console.debug('base ' + b);*/
			var b = vwr.getBase();
			
			var f = null; var fi = null;
			
			var t = y/23;
			t = t - (t%1) -1;
			
			var features = vwr.tracks[vwr.trackIndex[t]].features;
			var count = features.length;
			for(var i = count; i--; )
			{
				if(b >= features[i].s && b <= features[i].e)
				{
					console.debug('feature : ' + features[i].n);
					f = features[i];
					fi = i;
					break;
				}
			}
			//console.debug('no feature');
			
			vwr.selectedFeature = [vwr.trackIndex[t], fi];
/**
 * @name Viewer#trackClicked
 * @event
 * @memberOf BRAGV
 * @param {Object} track, base, feature,	 featureIndex
 */			
			div.trigger({
					type: 'trackClicked', 
					track : t+1,
					base : b,
					feature : f,
					featureIndex : fi
				});
			
			test.draw();
		}
	});
}