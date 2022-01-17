function createOverlayer(is_default)
	{
		
		append = '\
			<div id="mp-overlayer">\
    			<div id="mp-overlayer-background"></div>\
    			<div id="mp-overlayer-message">\
    				<div id="mp-message-content">\
    					<div id="mp-message-table">\
    						<div style="clear:both"></div>\
    					</div>\
    				</div>\
    			</div>\
    		</div>\
		';
		if($('body').children('#mp-overlayer').length == 0)
		{
			$('body').append(append);
		}
	}