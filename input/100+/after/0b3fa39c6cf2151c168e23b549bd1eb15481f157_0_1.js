function () {
        	var view = new View();
        	var _topic = this;
        	view.setContentType('text/html');
        	view.dir = path_module.normalize(__dirname + '/../testing_resources/');
        	view.error(function (error) {
        		throw error;
        	});
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