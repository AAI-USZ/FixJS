function() {
	
		// todo: demais atributos
		var src = $(this).attr("src");
		var id = $(this).attr("id");
		
		this.outerHTML = '<div id="'+id+'" class="nclPlayer"> </div>';

		webNclPlayers.push(new WebNclPlayer(src,id));
		
		style +=
			 '.nclPlayer_' + id + ' {'
			+'	position: fixed,'
			+'	left: ' + ($(this).attr('left') || '0px') + ';'
			+'	top: ' + ($(this).attr('top') || '0px') + ';'
			+'	width: ' + ($(this).attr('width') || '854px') + ';'
			+'	height: ' + ($(this).attr('height') || '480px') + ';'
			+'}';

	}