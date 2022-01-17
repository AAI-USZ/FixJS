function () {
        	var _topic = this;
        	var view = new View();
        	view.setContentType('text/html');
        	view.dir = __dirname.replace('/components', '/testing_resources') + '/';
        	view.error(function (error) {
        		throw error;
        	});
        	view.set('status', 'single view');

        	view.setResponse({
    			buffer : '',
        		write : function (chunk) {
        			this.buffer += chunk;
        		},
        		end : function () {
        			_topic.callback(null, {view: view, buffer: this.buffer});
        		}
        	});
        	view.render('view_example.html');
        }