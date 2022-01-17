function() {

	// jQuery vars
	$form = $('#form'),
	$newhotness = $('#newhotness'),
	$oldbusted = $("#oldbusted"),
	$character = $('#character'),
	$bg = $('#bg'),
	$url = $('#url'),
	$artboard = $('#artboard'),
	$highlighter = $('#artboard .highlighter'),
	$play_buttons = $('#inspector_spacetime .play button'),
	$stop = $('#inspector_spacetime .stop'),
	$canvas = $('#canvas'),
	$zoom_slide = $('#zoom_slide')
	$zoom_size = $('.zoom_size');
	$char_toggle = $('#char');
	$char_opacity = $('#char_opacity');
	$char_opacity_size = $('.char_opacity_size');

	// start loading the character lua asap
	$.getJSON(
		'/lua/' + $character.val(),
		function(data, textStatus, jqXHR) {
			_char = data.data;
			_animation = data.data.animations;
			costumes = _char.costumes;
			costumes.shift();
			for( var i in costumes ) {
				var cost_url = encodeURIComponent( 'https://github.com/kyleconroy/hawkthorne-journey/raw/master/src/' + _char.costumes[i].sheet );
				$('#in_game_costumes').append(
					$('<a href="/' + _char.name + '/' + cost_url + '">' + _char.costumes[i].name + '</a>')
				);
				// create a catalogue of known animation frames
				c._catalogue = [];
				for_each_tile( function( x, y ) {
					if( c._catalogue[ x ] == undefined ) c._catalogue[ x ] = [];
					if( c._catalogue[ x ][ y ] == undefined ) c._catalogue[ x ][ y ] = [];
				});
				for( var motion in _animation ) {
					for( var direction in _animation[ motion ] ) {
						for( var frame in _animation[ motion ][ direction ][ 1 ] ) {
							var set = _animation[ motion ][ direction ][ 1 ];
							if( set[ frame ] instanceof Array && set[ frame ].length == 2 ) {
								c._catalogue[ set[ frame ][0] ][ set[ frame ][1] ].push( "\n  " + motion + ' : ' + direction + "  " );
							}
						}
					}
				}
			}
		}
	);

	c = $canvas[0];
	c._face = false;
	c._dir = false;
	c._motion = 'stop';
	c._mouse = false;
	c._highlighted = [ 0, 0 ];

	// animation queue
	c._queue = [];

	$artboard.mousemove(function(e) {
		if( c._mouse != 'lock' ) {
			c._mouse = true;
			var loc = get_square_coords(e);
			$highlighter.css( {
				left: loc.X * 48,
				top: loc.Y * 48
			} );
			c._highlighted = [ loc.X, loc.Y ];
			$artboard.attr(
				'title',
				  '[ ' + ( loc.X + 1 ) + ', ' + ( loc.Y + 1 ) + ' ]' // tile position
				+ c._catalogue[ loc.X ][ loc.Y ].join('') // associated positions
			);
		}
	});

	$artboard.click(function(e) {
		if( c._mouse != 'lock' ) c._mouse = 'lock';
		else c._mouse = true;
	});

	// Inspector controls
	$zoom_slide.change(function() {
		var z = $zoom_slide.val();
		$canvas.css({
			"width": ( z * 48 ) + "px",
			"height": ( z * 48 ) + "px"
		});
		$zoom_size.html('x' + z);
	});

	$bg.change(function(e) {
		var state = $bg.prop('checked');
		$artboard.css('background', state ? '#34c429' : '');
		$canvas.css('background', state ? '#34c429' : '');
	});

	costume_specified = ( $newhotness.attr('src') !== '' );
	if( !costume_specified ) {
		$char_toggle.prop('checked',true);
	}

	$char_toggle.change(function() {
		$oldbusted.toggle();
	});

	$char_opacity.change(function() {
		var o = $char_opacity.val();
		$char_opacity_size.html( o + '%' );
		$oldbusted.css({'opacity': o / 100});
	});

	$play_buttons.click(function() {
		var action = this.id;
		c._mouse = false;
		c._face = false;
		c._dir = false;
		if( action == 'play_all' ) {
			for_each_tile( function(x,y) {
				c_queue.push( [ x, y ] );
			});
		} else if( action == 'stop' ) {
			c._queue = [];
		}
	});

	init_canvas();

	var supported_keys = [
		'shift',
		'shift+left',
		'alt+left',
		'left',
		'shift+right',
		'alt+right',
		'right',
		'alt+up',
		'up',
		'alt+down',
		'down',
		'space',
		'x'
	];
	for( var i in supported_keys ) {
		$(document).bind('keydown', supported_keys[i], change_state );
		$(document).bind('keyup', supported_keys[i], change_state );
	}

	// reload on change
	$character.change(function(e) { $url.val(''); $form.submit(); });
	$url.change(function(e) { $form.submit(); });

}