function(){
		// summary:
		//		Updates the navigation controls to hide/show them when at
		//		the first or last images.
		var cells = [];
		var change = function(node, add){
			var fn = add ? "addClass" : "removeClass";
			dojo[fn](node,"enabled");
			dojo[fn](node,"thumbClickable");
		};
		
		var pos = this.isHorizontal ? "scrollLeft" : "scrollTop";
		var size = this.isHorizontal ? "offsetWidth" : "offsetHeight";
		change(this.navPrev, (this.thumbScroller[pos] > 0));
		
		var last = this._thumbs[this._thumbs.length - 1];
		var addClass = (this.thumbScroller[pos] + this._scrollerSize < this.thumbsNode[size]);
		change(this.navNext, addClass);
	}