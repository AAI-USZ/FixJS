function(inKind) {
		var html = '<kind>' + inKind.name + '</kind>';
		if (inKind.superkinds.length) {
			//html += '<h3>Extends</h3>';
			html += '<div style="padding: 4px 0px;">';
			html += inKind.name;
			enyo.forEach(inKind.superkinds, function(e) {
				/*
				html += 
					'<superkind>' 
						+ '<a href=#' + e + '>'
							+ e 
						+ '</a>'
					+ '</superkind>';
				*/
				html += 
					' :: <a href=#' + e + '>'
						+ e 
					+ '</a>'
					;
			});
			html += '</div>';
		};
		return html;
	}