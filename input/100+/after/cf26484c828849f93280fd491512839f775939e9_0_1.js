function(messages) {
	Joomla.removeMessages();
	var container = document.id('system-message-container');
	
	Object.each(messages, function (item, type) {
		var div = new Element('div', {
			id: 'system-message',
			'class': 'alert alert-' + type
		});
		div.inject(container);
		var h4 = new Element('h4', {
			'class' : 'alert-heading',
			html: Joomla.JText._(type)		
		});
		h4.inject(div);
		var divList = new Element('div');
		Array.each(item, function (item, index, object) {
			var p = new Element('p', {
				html: item
			});
			p.inject(divList);
		}, this);
		divList.inject(div);
	}, this);
}