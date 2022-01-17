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