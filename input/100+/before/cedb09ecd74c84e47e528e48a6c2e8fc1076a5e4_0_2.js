function() {

		socket.emit('controller', { info: 'controller - DOM ready' });
		console.log(socket);
		$(".button")
		.bind('touchstart', function (e) {
			downbutton( e.target.id); 
		})
		.bind('mousedown', function (e) { 
		downbutton( e.target.id); 
		})
		.bind('mouseup', function (e) {
		upbutton( e.target.id); 
		})
		.bind('touchstart', function (e) {
		downbutton( e.target.id); 
		})
		.bind('touchcancel', function (e) {
		upbutton( e.target.id); 
		})
		.bind('touchend', function (e) {
		upbutton( e.target.id); 
		});

		document.ontouchmove = function(event) {
			event.preventDefault();
		}

	}