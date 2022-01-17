function integrateTouch (opts, cont) {
	polyfillRequestAnimFrame(window);

	if ( !!supportsTouch && ( !!opts.touchFx || $.fn.cycle.transitions[opts.fx].activeDir ) ) {

		bindTouchPause($(cont), onTouchPause, onTouchUnPause );
		if ( !!opts.touchClickDrag ) {
			bindClickAndDrag($(cont), onTouchPause, onTouchUnPause );
		}

		var getTouchPos = function (event) {
			if ( !!event && !!event.originalEvent && !!event.originalEvent.touches ) {
				return ({ pageX: event.originalEvent.touches[0].pageX, pageY: event.originalEvent.touches[0].pageY });
			} else if ( !!event && ( !!event.pageX || !!event.pageY ) ) {
				return ({ pageX: event.pageX, pageY: event.pageY });
			}
			return ({ pageX: 0, pageY: 0 });
		}

		var initPos = getTouchPos(),
			diffPos = getTouchPos(),
			dragging = false,
			prevElem, currElem, nextElem,
			$cont = opts.$cont,
			mainContSize = {
				width: $cont.width(),
				height: $cont.height()
			},
			touchFx = null,
			dir = { x: 0, y: 0 },
			currStart = { x: 0, y: 0 },
			changeCycle = 0,
			dragstate = null,
			revdir = ( !!opts.rev ) ?  -1 : 1;


		//TOUCHMOD -- ADD CSS RULES TO HELP ENGAGE iOS Hardware Acceleration
		$(opts.elements).css( { userSelect: 'none', userModify: 'read-only', userDrag: 'none', tapHighlightColor: 'transparent' } );

		//TOUCHMOD -- TOUCH BEHAVIOR INITIALIZATION
		var initSlidePos, snapSlideBack, dragSlideTick;

		//TOUCHMOD -- TOUCH TRANSITION & ASSOCIATED OPTIONS
		if ( !!opts.touchFx && !!$.fn.cycle.transitions[opts.touchFx] ) {
			touchFx = opts.touchFx;
			dir = $.fn.cycle.transitions[opts.touchFx].activeDir || { x: 1, y: 0 };
			if ( !!dir.x ) {
				changeCycle = (mainContSize.width/4);
			} else if ( !!dir.y )  {
				changeCycle = (mainContSize.height/4);
			}

			//ALLOW USER OPTION TO OVERRIDE DEFAULT TOUCH BEHAVIOR INITIALIZATION
			if ( !!$.fn.cycle.transitions[opts.touchFx].initSlidePos ) {
				initSlidePos = $.fn.cycle.transitions[opts.touchFx].initSlidePos;
			}
			if ( !!$.fn.cycle.transitions[opts.touchFx].snapSlideBack ) {
				snapSlideBack = $.fn.cycle.transitions[opts.touchFx].snapSlideBack;
			}
			if ( !!$.fn.cycle.transitions[opts.touchFx].dragSlideTick ) {
				dragSlideTick = $.fn.cycle.transitions[opts.touchFx].dragSlideTick;
			}
		} else {
			return false;
		}
		changeCycle = ( !!opts.touchCycleLimit ) ? opts.touchCycleLimit : changeCycle;

		//TOUCHMOD -- TOUCH CORE FUNCTIONALITY -- GETTING POSITION OF TOUCH EVENTS, PREPARING ELEMENTS FOR DRAGGING
		var dragStart = function (event) {
			if ( !!!opts.busy ) {
				window.cycle_touchMoveCurrentPos = getTouchPos(event);
				var currPos = window.cycle_touchMoveCurrentPos;

				initPos.pageX = currPos.pageX - initPos.pageX;
				initPos.pageY = currPos.pageY - initPos.pageY;
				var prevNum = (opts.elements.length + opts.currSlide - 1) % opts.elements.length;
				var nextNum = (opts.elements.length + opts.currSlide + 1) % opts.elements.length;

				$(opts.elements).stop(true,true);

				prevElem = $( opts.elements[prevNum] );
				currElem = $( opts.elements[opts.currSlide] );
				nextElem = $( opts.elements[nextNum] );

				currStart.x = currElem.position().left;
				currStart.y = currElem.position().top;

				initSlidePos( opts, prevElem, currElem, nextElem, initPos, mainContSize, dir, revdir, currStart );

				dragging = true;
				dragstate = null;
			}
		}

		var dragFrameTick = function () {
			var currPos = window.cycle_touchMoveCurrentPos;
			if ( dragstate !== 'dragging' && !!opts.touchMinDrag &&
				( Math.abs( diffPos.pageX ) * dir.y > opts.touchMinDrag || Math.abs( diffPos.pageY ) * dir.x > opts.touchMinDrag ) ) {
				dragstate = 'locked';
			}
			if ( !!!opts.busy && dragging && dragstate !== 'locked' ) {
				diffPos.pageX = currPos.pageX - initPos.pageX;
				diffPos.pageY = currPos.pageY - initPos.pageY;

				if ( dragstate !== 'locked' && ( Math.abs( diffPos.pageX ) * dir.x > opts.touchMinDrag || Math.abs( diffPos.pageY ) * dir.y > opts.touchMinDrag ) ) {
					dragSlideTick( opts, prevElem, currElem, nextElem, diffPos, mainContSize, dir, revdir, currStart );
					dragstate = 'dragging';
				} else {
					snapSlideBack( opts, prevElem, currElem, nextElem, diffPos, mainContSize, dir, revdir, currStart );
				}
			}
			window.requestAnimationFrame( dragFrameTick );
		}
		window.requestAnimationFrame( dragFrameTick );


		var dragMove = function (event) {
			window.cycle_touchMoveCurrentPos = getTouchPos(event);
			event.preventDefault();
		}

		window.cycle_touchMoveCurrentPos = getTouchPos();

		var dragEnd = function (event) {
			if ( !!!opts.busy && dragging ) {
				var cacheOpts = { speed: opts.speed, fx: opts.fx, ease: opts.easing }

				opts.fx = touchFx;
				opts.easing = 'linear';

				$(opts.elements).stop(true,true);

				if ( dragstate !== 'locked' && dragging && !!dir.x && Math.abs(diffPos.pageX) > changeCycle ) {
					opts.speed = opts.speedIn = opts.speedOut = Math.round( opts.speed * ( ( mainContSize.width - (mainContSize.width/4) - Math.abs( diffPos.pageX ) ) / mainContSize.width ) ) + 50;
					if ( diffPos.pageX < 0 ) advance(opts,1);
					if ( diffPos.pageX > 0) advance(opts,0);
				} else if ( dragstate !== 'locked' && dragging && !!dir.y && Math.abs(diffPos.pageY) > changeCycle ) {
					opts.speed = opts.speedIn = opts.speedOut = Math.round( opts.speed * ( ( mainContSize.height - (mainContSize.height/4) - Math.abs( diffPos.pageY ) ) / mainContSize.height ) ) + 50;
					if ( diffPos.pageY < 0 ) advance(opts,1);
					if ( diffPos.pageY > 0) advance(opts,0);
				} else {
					snapSlideBack( opts, prevElem, currElem, nextElem, diffPos, mainContSize, dir, revdir, currStart );
				}
				opts.speed = opts.speedIn = opts.speedOut = cacheOpts.speed;
				opts.fx = cacheOpts.fx;
				opts.easing = cacheOpts.ease;

				initPos = getTouchPos();
				diffPos = getTouchPos();

				dragging = false;
				dragstate = null;
				event.preventDefault();
			}
		}
		var dragCancel = function (e) {
			if ( !!e.originalEvent && !!e.originalEvent.touches && !!e.originalEvent.touches.length ) {
				abortDrag();
			}
		}
		var abortDrag = function () {
			snapSlideBack( opts, prevElem, currElem, nextElem, initPos, mainContSize, dir, revdir, currStart );

			dragging = false;
			dragstate = null;
			opts.busy = false;
		}

		$cont.bind( {
			touchstart: dragStart,
			touchmove: dragMove,
			touchend: dragEnd,
			touchcancel: dragCancel
		} );

		if (opts.touchClickDrag) {
			$cont.bind({
				mousedown: dragStart,
				mousemove: dragMove,
				mouseup: dragEnd
			});
		}
	}
}