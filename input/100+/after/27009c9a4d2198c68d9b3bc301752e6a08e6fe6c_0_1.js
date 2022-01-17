function(err, html, info) {
		if(err) {if(cb) cb(err); return;}
		el.html(html);
		//Register event handlers
		for(var i in info.eventHandlers)
		{
			var events = info.eventHandlers[i].events.split(" "),
				elem = document.getElementById(i);
			for(var j in events)
				elem['on' + events[j]] = info.eventHandlers[i].handler;
			//Delete comment before element
			elem.parentNode.removeChild(elem.previousSibling);
		}
		if(cb) cb(null, html, info);
	}