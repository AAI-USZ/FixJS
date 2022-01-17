function (src, channel, command) {
		var index, display = "<tr><td><b>Auto-Update Tiers: </b>" + tiers.options.autoupdate + "</td></tr>"
		+ "<tr><td><b>Last Tiers Check: </b>" + tiers.load+ "</td></tr>" 
		+ "<tr><td><b>Tiers File: </b>" + tiers.options.name + ".xml</td></tr>" 
		+ "<tr><td><b>Auto-Update Settings: </b>" + tiers.options.autoupdatesettings + "</td></tr>" 
		+ "<tr><td></td></tr>" 
		+ "<tr><td><h3><u>Tiers Keys</u></h3></td></tr>";
		for (index in tiers.links) {
			display += "<tr><td><b>" + index + ":</b> <a href='" + tiers.links[index] + "' style='color:green'>" + tiers.links[index] + "</a></td></tr>";
		}
		display += "</table";
		commanddisplay(src, "Tiers Settings", display, channel);
	}