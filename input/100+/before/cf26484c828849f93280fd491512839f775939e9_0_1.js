function(messages) {
	Joomla.removeMessages();
	var container = document.id('system-message-container');

	var dl = new Element('dl', {
		id: 'system-message',
		role: 'alert'
	});
	Object.each(messages, function (item, type) {
		var dt = new Element('dt', {
			'class': type,
			html: type
		});
		dt.inject(dl);
		var dd = new Element('dd', {
			'class': type
		});
		dd.addClass('message');
		var list = new Element('ul');

		Array.each(item, function (item, index, object) {
			var li = new Element('li', {
				html: item
			});
			li.inject(list);
		}, this);
		list.inject(dd);
		dd.inject(dl);
	}, this);
	dl.inject(container);
}