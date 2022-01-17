function (json, options) {
		this.json = eval(json);
		this.setOptions(options);

		this.resizeTimerID = null;
		this.tl = null;
		var dateFormat = this.options.dateFormat;

		Timeline.GregorianDateLabeller.prototype.labelPrecise = function(date)
		{
			// Crazy hackery to reset the label time to the correct one.
			// means the Z time format will not give you the correct tz
			var newdate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
			return newdate.format(dateFormat);
		}; 
		
		var eventSource = new Timeline.DefaultEventSource();

		// TODO: theme the viz in admin
		var theme = Timeline.ClassicTheme.create();
		theme.event.bubble.width = 320;
		theme.event.bubble.height = 520;
		theme.event.track.height = 11.5;
		theme.event.track.gap = 0.1;
		theme.ether.backgroundColors = [ "#000000", "red" ];
		
		theme.ether.highlightColor = 'red';

		Timeline.setDefaultTheme(theme);
		
		var bandBase = {
				trackGap : 0.2,
				width : "70%",
				intervalUnit : Timeline.DateTime.DAY,
				intervalPixels : 50
			}
		
		
		var bandTracks = [];
		
		for (var b = 0; b < json.bands.length; b ++) {
			var bandClone = Object.clone(bandBase);
			bandClone.width = json.bands[b].width;
			bandClone.intervalUnit = json.bands[b].intervalUnit;
			bandClone.overview = json.bands[b].overview;
			bandClone.eventSource = eventSource;
			bandClone.theme = theme;
			bandTracks.push(Timeline.createBandInfo(bandClone));
		}
		
		// Sync the bands to scroll together
		for (var b = 1; b < json.bands.length; b ++) {
			bandTracks[b].syncWith = 0;
			bandTracks[b].highlight = true;
		}
	
		this.tl = Timeline.create(document.id("my-timeline"), bandTracks, this.options.orientation);
		
		eventSource.loadJSON(this.json, '');

		window.addEvent('resize', function () {
			if (this.resizeTimerID === null) {
				this.resizeTimerID = window.setTimeout(function () {
					this.resizeTimerID = null;
					this.tl.layout();
				}.bind(this), 500);
			}
		}.bind(this));
		
		this.watchDatePicker();
	}