function () {
        	var _topic = this;
        	var view = new View();
        	view.setContentType('text/html');
        	view.dir = __dirname.replace('/components', '/testing_resources') + '/';
        	view.error(function (error) {
        		throw error;
        	});
        	var child = view.child('status');
        	child.set('status', 'child');
        	child.render('view_example.mu.html');

        	view.setResponse({
    			buffer : '',
        		write : function (chunk) {
        			this.buffer += chunk;
        		},
        		end : function () {
        			_topic.callback(null, {view: view, buffer: this.buffer});
        		}
        	});
        	view.render('view_example.mu.html');
        }