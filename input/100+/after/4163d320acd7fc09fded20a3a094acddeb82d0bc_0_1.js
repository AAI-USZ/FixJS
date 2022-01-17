function(e){
	  // Only handle single finger events
	  if(e.touches.length == 1){
	    _this.view.x = _this.touchstart.x - e.touches[0].pageX;
	    _this.view.y = _this.touchstart.y - e.touches[0].pageY;
	    // Limit the scroll
	    if( _this.view.x > _this.wid-_this.view.w ) _this.view.x = _this.wid-_this.view.w;
	    if( _this.view.y > _this.hei-_this.view.h ) _this.view.y = _this.hei-_this.view.h;
	    if( _this.view.x < 0 ) _this.view.x = 0;
	    if( _this.view.y < 0 ) _this.view.y = 0;
	    _this.canvas.setStyles({
	      left: (_this.wid>_this.view.w) ? -_this.view.x : Math.round((_this.view.w-_this.wid)/2),
	      top: (_this.hei>_this.view.h) ? -_this.view.y : Math.round((_this.view.h-_this.hei)/2)
	    });
	  }
	  if( e.touches.length == 2 ){
	    var xx = Math.round( (e.touches[0].pageX+e.touches[1].pageX) / 2 ) + _this.view.x;
	    var yy = Math.round( (e.touches[0].pageY+e.touches[1].pageY) / 2 ) + _this.view.y;
	    var origin = xx + 'px,' + yy + 'px';
	    _this.canvas.setStyle( this.CSSprefix+'transform-origin', origin );
	  }
        }