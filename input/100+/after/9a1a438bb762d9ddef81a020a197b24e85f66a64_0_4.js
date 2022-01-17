function changeCell(x, y, e) {
		if (currentTile != undefined && mode == 'tile') {
		    $('#cell_'+x+'_'+y).css('background', 'url(./ressources/levels/tiles/'+currentTile+'.png)');
		}

		if (currentSprite != undefined && mode == 'sprite') {
			if (currentSprite.image == 'empty') {
				$('#cell_'+x+'_'+y).children('img').not('.na').remove();				
			} else {
				var img = $('<img src="./ressources/levels/sprites/'+currentSprite.image+'.png" />');
				img.css({
					position: 'absolute',
					left: -currentSprite.x,
					top: -currentSprite.y
				});
				$('#cell_'+x+'_'+y).children('img').not('.na').remove();
				$('#cell_'+x+'_'+y).prepend(img);				
			}
		}
	}