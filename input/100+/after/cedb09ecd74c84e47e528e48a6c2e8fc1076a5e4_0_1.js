function() {

		socket.emit('controller', { info: 'controller - DOM ready' });

		$("#a.button")
		.bind('touchstart', function (e) {
			log('down');
		})
		.bind('touchend', function (e) {
			log('up');
		})
		.bind('touchmove', function (e) {
			$("#log").prepend("touch move:" + e.target);
		})
		.bind('touchcancel', function (e) {
			log('cancel');
		})

		// the correct events for the screen (equivalents needed for touch)
		.bind('mouseleave', function(e) {
			console.log('left');
		})
		.bind('mouseenter', function(e) {
			$("#log").prepend("mouse enter:" + e.target);
		})
		.bind('mousedown', function (e) { 
			console.log('down');
		})

		/*
		.bind('mouseup', function (e) {
		upbutton( e.target.id); 
		})
		*/

		document.ontouchmove = function(event) {
			event.preventDefault();
		}

	}