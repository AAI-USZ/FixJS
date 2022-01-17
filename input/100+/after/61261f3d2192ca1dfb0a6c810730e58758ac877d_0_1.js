function setTable(is_default)
	{
		table = '';
		if(is_default)
		{
			table += '\
				<div id="mp-message-content-message"></div>\
				<div id="mp-message-content-buttons">\
					<div class="mp-message-content-buttons-button">\
						<a class="mp-overlayer_button" id="mp-overlayer-yes-button">\
            				' + opts.yes_text + '\
            				<input type="hidden" id="mp-overlayer-yes-button-id" />\
            			</a>\
					</div>\
					<div class="mp-message-content-buttons-button">\
						<a class="mp-overlayer_button" id="mp-overlayer-no-button">' + opts.no_text + '</a>\
					</div>\
				</div>\
			';
		}
		else {
			table += '\
					<div id="mp-message-content-message">' + singleCallOpts.message + '</div>\
					<div id="mp-message-content-buttons">\
				';
			for(i = 0; i < $(singleCallOpts.buttons).length; i++)
			{
				button_id = singleCallOpts.buttons[i]['button_text'].replace(' ', '-');
				table += '\
					<div class="mp-message-content-buttons-button">\
    					<a class="mp-overlayer_button" id="mp-overlayer-' + button_id + '-button"'; 
				
				if(singleCallOpts.buttons[i]['action'] == undefined || singleCallOpts.buttons[i]['action'] == '')
				{
					$(document).off('click', '#mp-overlayer #mp-overlayer-' + button_id + '-button');
					$(document).on('click', '#mp-overlayer #mp-overlayer-' + button_id + '-button', function() {
						$.mpHide();
					});
				}
				else {
					action = singleCallOpts.buttons[i]['action'];
					
					$(document).off('click', '#mp-overlayer #mp-overlayer-' + button_id + '-button');
					$(document).on('click', '#mp-overlayer #mp-overlayer-' + button_id + '-button', function() {
						action();
						$.mpHide();
					});
				}
				table += '>\
						' + singleCallOpts.buttons[i]['button_text'] + '\
						</a>\
					</div>\
				';
			}
			table += '\
				</div>\
			';
		}
		$('#mp-overlayer #mp-message-table').html(table);
	}