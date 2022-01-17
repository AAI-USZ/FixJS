function(id) {

		this.windowInitialize(id, arguments[1] || {});

		this.divList  = this.id+'_channel_list';

		this.divInput = this.id+'_channel_input';

		this.channels = [];

		$("#" + this.divContent).html('<div class="list_content">'+

		                               '<div class="list_input" id='+this.divInput+'">Enter channel name, starting with a # (and hit enter to join)<br /><input type="text" id="entered_channel" name="entered_channel" value="#" /><br />Or select a channmel from the list (click to join)</div>'+

		                               '<div class="list_list" id="'+this.divList+'"></div>'+

		                               '</div>');

		//$('#entered_channel').observe('keypress', this.onKeyPress);

		this.setTitle('Select a channel');

		chat.message('/list');

	}