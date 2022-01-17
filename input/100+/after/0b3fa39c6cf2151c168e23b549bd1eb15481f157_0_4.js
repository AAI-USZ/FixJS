function () {
        	var view = new View();
        	var _topic = this;
        	view.setContentType('text/html');
        	view.dir = __dirname.replace('/components', '/testing_resources') + '/';
        	view.error(function (error) {
        		throw error;
        	});
        	var child = view.child('status');
        	
        	view.render('view_example.html');

        	view.setResponse({
    			buffer : '',
        		write : function (chunk) {
        			this.buffer += chunk;
        		},
        		end : function () {
        			_topic.callback(null, {view: view, buffer: this.buffer});
        		}
        	});

        	child.set('status', 'child');
        	child.render('view_example.html');
        }