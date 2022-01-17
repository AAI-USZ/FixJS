function changeAccessibility(x, y, state) {
		if(!state) {
			var img = $('<img src="./ressources/na.png" class="na" />');
			$('#cell_'+x+'_'+y).children('.na').remove();
			$('#cell_'+x+'_'+y).append(img);
		} else {
			$('#cell_'+x+'_'+y).children('.na').remove();
		}
	}