function() {

	// jQuery vars
	$newhotness = $('#newhotness'),
	$oldbusted = $("#oldbusted"),
	$character = $('#character'),
	$bg = $('#bg'),
	$costume = $('#costume'),
	$url = $('#url'),
	$artboard = $('#artboard'),
	$highlighter = $('#artboard .highlighter'),
	$play_buttons = $('#inspector_spacetime .play button'),
	$stop = $('#inspector_spacetime .stop'),
	$canvas = $('#canvas'),
	$zoom_slide = $('#zoom_slide')
	$zoom_size = $('.zoom_size');
	$char_opacity = $('#char_opacity');
	$char_opacity_size = $('.char_opacity_size');

	c = $canvas[0];
	c._face = 'left';
	c._dir = false;
	c._mouse = false;
	// animation queue
	c._queue = [];

	var fps = 10;
	setInterval(function() {
		update();
		draw();
	}, 1000 / fps );

	$character.change(function(e) {
		updateOriginal($(this).val());
	});

	$bg.change(function(e) {
		var state = $bg.prop('checked');
		$artboard.css('background', state ? '#34c429' : '');
		$canvas.css('background', state ? '#34c429' : '');
	});

	$costume.submit(function(e) {
		e.preventDefault();
	})

	$url.on('change', function(e) {
		$costume.submit();
	});

	$artboard.mousemove(function(e) {
		if( c._mouse != 'lock' ) {
			c._mouse = true;
			var loc = get_square_coords(e);
			c._queue = [ [ loc.X, loc.Y ] ];
			$artboard.attr('title','[ ' + loc.X + ', ' + loc.Y + ' ]');
		}
	});

	$artboard.click(function(e) {
		if( c._mouse != 'lock' ) c._mouse = 'lock';
		else c._mouse = true;
	});

	$zoom_slide.change(function() {
		z = $zoom_slide.val();
		$canvas.css({
			"width": ( z * 48 ) + "px",
			"height": ( z * 48 ) + "px"
		});
		$zoom_size.html('x' + z);
	});

	$char_opacity.change(function() {
		z = $char_opacity.val();
		$char_opacity_size.html(z + '%');
	});

	$play_buttons.click(function() {
		var action = this.id;
		c._mouse = c._face = c._dir = false;
		if( action == 'play_all' ) {
			for( var y = 0; y <= 14; y++ ) {
				for( var x = 0; x <= 8; x++ ) {
					c._queue.push( [ x, y ] );
				}
			}
		} else if( action == 'stop' ) {
			c._queue = [];
		} else if( action == 'spin' ) {
			var s = motion.other.spin;
			c._queue = [].concat(s,s,s,s,s);
		}
	});

	init_canvas();

	$(document).bind('keydown', 'left', start_running );
	$(document).bind('keyup', 'left', stop_running );
	$(document).bind('keydown', 'right', start_running );
	$(document).bind('keyup', 'right', stop_running );
	$(document).bind('keydown', 'up', start_running );
	$(document).bind('keyup', 'up', stop_running );
	$(document).bind('keydown', 'down', start_running );
	$(document).bind('keyup', 'down', stop_running );

}