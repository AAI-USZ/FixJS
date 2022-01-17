function(){
			if (!$(this).data('class')){
				$(selectors[17]).append('<div id="hz_opts"><strong>Google+ Hover Zoom</strong><ul><li id="disable_hz">'+lang.menu02+'</li>'+menuTmp+'</ul></div>');
				$(this).data('class', true);
			}
		}