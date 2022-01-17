function setTable(is_default)
	{
		table = '';
		if(is_default)
		{
			table += '\
				<tr>\
					<td colspan="2">\
						<span id="mp-message-content-message"></span>\
					</td>\
				</tr>\
				<tr>\
					<td>\
						<a class="mp-overlayer_button" id="mp-overlayer-yes-button">\
							' + opts.yes_text + '\
							<input type="hidden" id="mp-overlayer-yes-button-id" />\
						</a>\
					</td>\
					<td>\
						<a class="mp-overlayer_button" id="mp-overlayer-no-button">' + opts.no_text + '</a>\
					</td>\
				</tr>';
		}
		else {
			table += '\
				<tr>\
					<td colspan="' + $(singleCallOpts.buttons).length + '">\
						<span id="mp-message-content-message">' + singleCallOpts.message + '</span>\
					</td>\
				</tr>\
				<tr>';
			for(i = 0; i < $(singleCallOpts.buttons).length; i++)
			{
				button_id = singleCallOpts.buttons[i]['button_text'].replace(' ', '-');
				table += '\
					<td>\
    					<a class="mp-overlayer_button" id="mp-overlayer-' + button_id + '-button"'; 
				
				if(singleCallOpts.buttons[i]['action'] == undefined || singleCallOpts.buttons[i]['action'] == '')
				{
					$(document).off('click', '#mp-overlayer #mp-overlayer-' + button_id + '-button');
					$(document).on('click', '#mp-overlayer #mp-overlayer-' + button_id + '-button', function() {
						$.mpHide();
					});
				}
				else {
					console.log(singleCallOpts.buttons[i]['action']);
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
					</td>';
			}
			table += '\
				</tr>';
		}
		console.log(table);
		$('#mp-overlayer #mp-message-table').html(table);
	}