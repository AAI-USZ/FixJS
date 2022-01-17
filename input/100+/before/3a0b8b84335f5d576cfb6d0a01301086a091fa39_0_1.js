function( toShow, toHide, data ) {
		var total, easing, duration,
			that = this,
			down = toShow.length &&
				( !toHide.length || ( toShow.index() < toHide.index() ) ),
			animate = this.options.animate || {},
			options = down && animate.down || animate,
			complete = function() {
				toShow.removeData( "accordionHeight" );
				that._completed( data );
			};

		if ( typeof options === "number" ) {
			duration = options;
		}
		if ( typeof options === "string" ) {
			easing = options;
		}
		// fall back from options to animation in case of partial down settings
		easing = easing || options.easing || animate.easing;
		duration = duration || options.duration || animate.duration;

		if ( !toHide.size() ) {
			return toShow.animate( showProps, duration, easing, complete );
		}
		if ( !toShow.size() ) {
			return toHide.animate( hideProps, duration, easing, complete );
		}

		total = toShow.show().outerHeight();
		toHide.animate( hideProps, duration, easing );
		toShow
			.hide()
			.data( "accordionHeight", {
				total: total,
				toHide: toHide
			})
			.animate( this.options.heightStyle === "content" ? showProps : showPropsAdjust,
				duration, easing, complete );
	}