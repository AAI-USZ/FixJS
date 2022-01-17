function(parent, data) {
			if(data.content && data.content.length==1000) {
				data.content += repl('... <a href="%(name)s.html">(read on)</a>', data);
			}
			parent.innerHTML = repl('<h2><a href="%(name)s.html">%(title)s</a></h2>\
				%(content)s<br /><br />', data);
		}