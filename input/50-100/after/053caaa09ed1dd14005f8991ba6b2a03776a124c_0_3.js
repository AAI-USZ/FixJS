function(data)
        {
		 var fragment = doc.getElementById(data.id);
		     fragment.setAttribute("style", "visibility:hidden;");
		
            // called via $this->_redirect() in a controller
            if (data.redirect) {
                window.location = data.redirect;
            }
	    fragment.innerHTML = data.content;
            _addCss(data.css, fragment);
            doc.title = data.title;
	    
	    
            

            for (var i in data.js) {		
			 _js_queue.push(data.js[i]);
            }

            _processQueue();
        }