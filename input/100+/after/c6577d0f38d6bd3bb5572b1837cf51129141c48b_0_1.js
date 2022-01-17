function(e){
			if (!e.pageX)
				e.pageX = $(this).find('#position').position().left + $(this).position().left;
		    var position = e.pageX - $(this).position().left;
		    if (!position) return;
		    var width = $(this).width();
		    var seek = Math.round(position / width * $('#controls .duration.progressTime').data('value'));
		    Ajax.get("Seek", {position: seek});
		}