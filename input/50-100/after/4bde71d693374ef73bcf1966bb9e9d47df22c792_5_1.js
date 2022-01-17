function(eventInfo) {
		var eventName = eventInfo.get('eventName');
		var act_primary = eventInfo.get('act_primary');
		var data = {'info': eventName + ' act_primary: ' + act_primary};
		$(this.el).append(this.template(data));
/*		var data = {'info': 'concert name here!'};
		$(this.el).append(this.template(data));*/
		return this.el;
	}