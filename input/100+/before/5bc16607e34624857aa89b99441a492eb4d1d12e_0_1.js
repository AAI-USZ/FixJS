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
			}
		}