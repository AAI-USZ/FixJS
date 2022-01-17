function(widget, caller, options) {	
	mw.log( 'setPosition' );
	
	var el = widget;
	var referrer = caller;
	var dims = {
		refX: referrer.offset().left,
		refY: referrer.offset().top,
		refW: referrer.getTotalWidth(),
		refH: referrer.getTotalHeight()
	};	
	var options = options;
	var xVal, yVal; 
	
	// Remove any other empty menuHelpers:
	$('.menuPositionHelper').each( function(inx, menuHelper ){
		if( $( menuHelper ).children().length == 0  ){
			$( menuHelper ).remove();
		}
	});

	var helper = $( '<div class="menuPositionHelper">' );	
	helper.css( 'z-index', options.zindex );
	
	mw.log("set z-index");
	
	// Hard code width height of button if unset ( crazy IE )
	if(  isNaN( dims.refW ) ||  isNaN( dims.refH ) ) {
		dims.refH = 16;
		dims.refW = 23;
	}
	helper.css({ 
		'position': 'absolute', 
		'left': dims.refX, 
		'top': dims.refY, 
		'width': dims.refW, 
		'height': dims.refH 
	});
	
	mw.log("set helper.css ");
	
	el.wrap( helper );
	
	mw.log("wrap helper");
	
	xVal = yVal = 0;
	// get X pos			
	switch( options.positionOpts.posX ) {
		case 'left': xVal = 0; 
			break;				
		case 'center': xVal = dims.refW / 2;
			break;				
		case 'right': xVal = dims.refW;
			break;
	};
	
	// get Y pos
	switch( options.positionOpts.posY ) {
		case 'top' :	yVal = 0;
			break;				
		case 'center' : yVal = dims.refH / 2;
			break;				
		case 'bottom' : yVal = dims.refH;
			break;
	};	

	// add the offsets (zero by default)
	xVal += ( options.positionOpts.offsetX )? options.positionOpts.offsetX : 0;
	yVal += ( options.positionOpts.offsetY )? options.positionOpts.offsetY : 0;
	
	mw.log(" about to position: " + yVal );
	// position the object vertically
	if (options.positionOpts.directionV == 'up') {
		el.css( { 
			'top': 'auto', 
			'bottom': yVal 
		} );
		if (options.positionOpts.detectV && !fitVertical(el)) {
			el.css({ 
				'bottom' : 'auto', 
				'top' : yVal 
			});
		}
	}  else {
		el.css({ 
			'bottom' : 'auto',
			'top' : yVal 
		});
		if (options.positionOpts.detectV && !fitVertical(el)) {
			el.css({ 
				'top' : 'auto', 
				'bottom' : yVal 
			});
		}
	};
	
	mw.log(" done with add the offsets && position the object vertically");
	
	// and horizontally
	if (options.positionOpts.directionH == 'left') {
		el.css({ left: 'auto', right: xVal });
		if (options.positionOpts.detectH && !fitHorizontal(el)) {
			el.css({ right: 'auto', left: xVal });
		}
	} 
	else {
		el.css({ right: 'auto', left: xVal });
		if (options.positionOpts.detectH && !fitHorizontal(el)) {
			el.css({ left: 'auto', right: xVal });
		}
	};
	
	mw.log(" done with position the object horizontally");
	
	// if specified, clone the referring element and position it so that it appears on top of the menu
	if (options.positionOpts.linkToFront) {
		referrer.clone().addClass('linkClone').css({
			position: 'absolute', 
			top: 0, 
			right: 'auto', 
			bottom: 'auto', 
			left: 0, 
			width: referrer.width(), 
			height: referrer.height()
		}).insertAfter(el);
	};
	mw.log('done with all');
}