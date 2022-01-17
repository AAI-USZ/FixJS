function() {
			if ( animateFlg == true ) {
				animateFlg = false;
				var targetHash = this.hash;
				var offset = $(targetHash).eq(0).offset();
				if ( targetHash && offset !== null ) {
					var targetPosition = offset.top;
					var wst = $(window).scrollTop();
					if ( wst === 0 ) {
						$(window).scrollTop( wst + 1 );
					}
					var targetBody = getTargetBody();
					if ( typeof targetBody !== 'undefined' ) {
						targetBody.animate(
							{
								scrollTop : targetPosition
							},
							config.duration,
							config.easing,
							function() {
								animateFlg = true;
								location.hash = targetHash;
							}
						);
						
						var scrollStop = function() {
							if ( animateFlg ) {
								targetBody.stop( true );
							}
							animateFlg = true;
						};
						if ( window.addEventListener ) {
							window.addEventListener( 'DOMMouseScroll', scrollStop, false );
						}
						window.onmousewheel = document.onmousewheel = scrollStop;
					}
				}
			}
			return false;
		}