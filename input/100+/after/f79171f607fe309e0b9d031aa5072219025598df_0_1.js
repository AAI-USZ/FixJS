function() {
		var fill = document.createElement('vml:fill');
		fill.type = 'gradient';
		if(this.orientation == 'vertical')
			fill.angle = 180;
		else
			fill.angle = 270;
		fill.color = this.stops[0].color.getCssHtml();
		fill.opacity = this.stops[0].color.getRgba().a;
		fill.color2 = this.stops[this.stops.length - 1].color.getCssHtml();
		fill.opacity2 = this.stops[this.stops.length - 1].color.getRgba().a;
		fill.method = 'None';
		if(this.stops.length > 2) {
			var colors = '';
			for(var i = 1; i < this.stops.length-1; i++) {
				if(colors != '')
					colors += ',';
				colors += Math.round(this.stops[i].offset * 100)+'% '+this.stops[i].color.getCssHtml();
			}
			fill.colors = colors;
		}
		return fill;
	}