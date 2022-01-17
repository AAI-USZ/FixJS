function(elCell, oRecord, oColumn, oData) {
		if (oData) {
			var title = oData.title;
			var url = oData.url;
			if (title != null && url != null && url != "") {
				var cnt = $("<div></div>");
				cnt.html("<span>" + title + " </span>");
				var link = $("<a href='" + url + "'><img src='" + YAHOO.cuanto.urls.get("shortcutImg") +
					"' style='width:13px; height:13px;'/></a>");
				cnt.append(link);
				$(elCell).html("");
				$(elCell).append(cnt);
				YAHOO.util.Event.addListener(link, "click", showBugInNewWindow);
			}
			else if (title != null) {
				$(elCell).html(title);
			}
			else if (url != null && url != "") {
				var cnt = $("<div></div>");
				var titleSpan = $("<span/>");
				titleSpan.html(title + " ");
				cnt.appendChild(titleSpan);
				var link = $("<a href='" + url + "'></a>");
				var img = $("<img src='" + YAHOO.cuanto.urls.get("shortcutImg") + "'/>");
				img.css({width: "13px", height: "13px"});
				link.appendChild(img);
				cnt.appendChild(link);
				$(elCell).html("");
				elCell.appendChild(cnt);
				YAHOO.util.Event.addListener(link, "click", pub.showBugInNewWindow);
			}
			else {
				$(elCell).html("");
			}
		} else {
			$(elCell).html("");
		}
	}