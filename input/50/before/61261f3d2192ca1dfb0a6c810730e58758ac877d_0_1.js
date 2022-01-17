function createOverlayer(is_default)
	{
		append = '\
			<div id="mp-overlayer">\
    			<div id="mp-overlayer-background"></div>\
    			<div id="mp-overlayer-message">\
    				<div id="mp-message-content">\
    					<table id="mp-message-table">\
						</table>\
    				</div>\
    			</div>\
    		</div>\
		';
		if($('body').children('.mp-overlayer').length == 0)
		{
			$('body').append(append);
		}
	}