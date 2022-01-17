function(eventInfo) {
		console.log('rendering eventView');
		var eventName = eventInfo.eventName;
		var data = {'info': eventName};
		$(this.el).append(this.template(data));
/*		var data = {'info': 'concert name here!'};
		$(this.el).append(this.template(data));*/
		return this.el;
	}