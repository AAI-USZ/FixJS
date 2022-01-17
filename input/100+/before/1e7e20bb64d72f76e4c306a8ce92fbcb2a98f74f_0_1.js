function slotSegHtml(event, seg) {
		var html = "<";
		var url = event.url;
		var skinCss = getSkinCss(event, opt);
		var skinCssAttr = (skinCss ? " style='" + skinCss + "'" : '');
		var classes = ['fc-event', 'fc-event-skin', 'fc-event-vert'];
		if (isEventDraggable(event)) {
			classes.push('fc-event-draggable');
		}
		if (seg.isStart) {
			classes.push('fc-corner-top');
		}
		if (seg.isEnd) {
			classes.push('fc-corner-bottom');
		}
		classes = classes.concat(event.className);
		if (event.source) {
			classes = classes.concat(event.source.className || []);
		}
		if (url) {
			html += "a href='" + htmlEscape(event.url) + "'";
		}else{
			html += "div";
		}
		html +=
			" class='" + classes.join(' ') + "'" +
			" style='position:absolute;z-index:8;top:" + seg.top + "px;left:" + seg.left + "px;" + skinCss + "'" +
			">" +
			"<div class='fc-event-inner fc-event-skin'" + skinCssAttr + ">" +
			"<div class='fc-event-head fc-event-skin'" + skinCssAttr + ">" +
			"<div class='fc-event-time'>" +
			htmlEscape(formatDates(event.start, event.end, opt('timeFormat'))) +
			"</div>" +
			"</div>" +
			"<div class='fc-event-content'>" +
			"<div class='fc-event-title'>" +
			htmlEscape(event.title) +
			"</div>" +
			"</div>" +
			"<div class='fc-event-bg'></div>" +
			"</div>"; // close inner
		if (seg.isEnd && isEventResizable(event)) {
			html +=
				"<div class='ui-resizable-handle ui-resizable-s'>=</div>";
		}
		html +=
			"</" + (url ? "a" : "div") + ">";
		return html;
	}