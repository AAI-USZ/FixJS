function(data)
        {
            // called via $this->_redirect() in a controller
            if (data.redirect) {
                window.location = data.redirect;
            }
            _addCss(data.css);
            doc.title = data.title;
            doc.getElementById(data.id).innerHTML = data.content;

            for (var i in data.js) {
                _js_queue.push(data.js[i]);
            }

            _processQueue();
        }