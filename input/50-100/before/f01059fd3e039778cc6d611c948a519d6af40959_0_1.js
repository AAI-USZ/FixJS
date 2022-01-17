function(parent, data) {
			if(data.content && data.content.length==1000) {
				data.content += repl('... <a href="%(name)s.html">(read on)</a>', data);
			}
			data.content = wn.markdown(data.content);
			if(data.last_name) data.last_name = ' ' + data.last_name;
			data.date = prettyDate(data.creation);
			parent.innerHTML = repl('<h2><a href="%(name)s.html">%(title)s</a></h2>\
				<p><div class="help">By %(first_name)s%(last_name)s, %(date)s</div></p>\
				<p>%(content)s</p><br>', data)
				//<a href="%(name)s.html">Read Full Text</a><br>', data);
		}