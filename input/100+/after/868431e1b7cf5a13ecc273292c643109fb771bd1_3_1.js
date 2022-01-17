function(events, elementID, eventHandler, buf, commentExists) {
		eventHandlers[elementID] = {"events": events, "handler": eventHandler};
		var comment = "i[" + JSON.stringify(events) + "]=" + eventHandler.toString();
		if(commentExists)
		{
			var i = buf.length - 1;
			buf[i] = buf[i].substr(0, buf[i].length-3) + ";" + comment + "-->";
		}
		else
			buf.push("<!--" + comment + "-->");
	}