function(xhr) {
		var b = new Bibtex(xhr.responseText),
			Log = require('log'),
		    container = document.body;
		
		b.parse();
		b.records.reverse();
		
		var groups = {
			"Conference": [],
			"Workshop": [],
			"Miscellaneous": []
		};
		
		b.records.forEach(function(r){
			var t = (r.type || "").replace(/^[\{\s]*/,"").replace(/[\s\}]*$/,"");
			
			if (-1 < ["conference", "conf", "c"].indexOf(t)) {
				groups["Conference"].push(r);
			}
			else if (-1 < ["workshop", "ws"].indexOf(t)) {
				groups["Workshop"].push(r);
			}
			else {
				groups["Miscellaneous"].push(r);
			}
		});
		
		if (0 == groups["Conference"].length && 0 == groups["Workshop"].length) {
			var l = document.createElement("ul");
			    l.innerHTML = Bibtex.format(groups["Miscellaneous"], pattern)
			container.appendChild(l);
		}
		else {
			for (t in groups) {
				if (groups[t].length > 0) {
					var h = document.createElement("h3");
					    h.innerHTML = t;
					var l = document.createElement("ul");
					    l.innerHTML = Bibtex.format(groups[t], pattern)
				
					container.appendChild(h);
					container.appendChild(l);
				}
			}
		}
	}