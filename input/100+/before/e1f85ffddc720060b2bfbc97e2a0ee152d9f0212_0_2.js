function( config ) {
		var defaults = {
			duration : 1000,
			easing : 'easeOutQuint'
		};
		config = $.extend( defaults, config );
		return this.each( function( i, elem ) {
			$(elem).click( function() {
				var targetHash = this.hash;
				var offset = $(targetHash).eq(0).offset();
				if ( targetHash && offset !== null ) {
					var targetPosition = offset.top;
					var wst = $(window).scrollTop();
					if ( wst === 0 ) {
						$(window).scrollTop( wst + 1 );
					}
					if ( $('html').scrollTop() > 0 ) {
						var targetBody = $('html');
					} else if ( $('body').scrollTop() > 0 ) {
						var targetBody = $('body');
					}
					if ( typeof targetBody !== 'undefined' ) {
						var animateFlg = true;
						targetBody.animate(
							{
								scrollTop : targetPosition
							},
							config.duration,
							config.easing,
							function() {
								animateFlg = false;
								location.hash = targetHash;
							}
						);
						var scrollStop = function() {
							if ( animateFlg ) {
								targetBody.stop();
							}
							animateFlg = false;
						};
						if ( window.addEventListener ) {
							window.addEventListener( 'DOMMouseScroll', scrollStop, false );
						}
						window.onmousewheel = document.onmousewheel = scrollStop;
					}
				}
				return false;
			});
		});
	}