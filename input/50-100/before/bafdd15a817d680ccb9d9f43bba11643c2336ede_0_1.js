function(path) {
			
			// check for cache
			if (views.hasOwnProperty(path)) return views[path];
			
			// fetch source file
			var view = $.ajax({
				async: false,
		    contentType: "text/html; charset=utf-8",
		    dataType: "text",
		    timeout: 10000,
		    url: path,
		    success: function() {},
		    error: function() {
					throw "Error: template not found";
		    }
			}).responseText;
			
			// cache view
			views[path] = views;
			
			// return
			return view;
			
		}