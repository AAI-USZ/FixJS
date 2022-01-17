function(Y){
	var EVT_LOAD = 'load';
	
	Y.Project = Y.Base.create('project', Y.ModelFix, [], {
		
		initializer: function(config){
			this.idAttribute = '_id';
			this.set('tasks', new Y.TaskList(), {silent: true});
			this.set('team', new Y.ResourceList(), {silent: true});
		},
		
		load: function (options, callback) {
	        var self = this;
	
	        // Allow callback as only arg.
	        if (typeof options === 'function') {
	            callback = options;
	            options  = {};
	        }
	
	        options || (options = {});
	
	        self.sync('read', options, function (err, response) {
	            var facade = {
	                    options : options,
	                    response: response
	                },
	
	                parsed;
	
	            if (err) {
	                facade.error = err;
	                facade.src   = 'load';
	
	                self.fire(EVT_ERROR, facade);
	            } else {
	                // Lazy publish.
	                if (!self._loadEvent) {
	                    self._loadEvent = self.publish(EVT_LOAD, {
	                        preventable: false
	                    });
	                }
	
	                parsed = facade.parsed = self.parse(response);
	                
	                self.get('tasks').reset(parsed.tasks);
	                Y.Task.lastCount = 0;
	                self.get('team').reset(parsed.team);
	                Y.Resource.lastCount = 0;
	                
	                delete parsed.tasks;
	                delete parsed.team;
	
	                self.setAttrs(parsed, options);
	                self.changed = {};
	
	                self.fire(EVT_LOAD, facade);
	            }
	
	            callback && callback.apply(null, arguments);
	        });
	
	        return self;
	    },

		
		sync: function(action, options, callback){
			var actionFn = this[action],
				iocfg = {
					on: {
						success: function(tid, response) {
							callback(null, response.responseText);
						},
						failure: function(tid, response){
							callback(response.statusText);
						},
					}
				};
			actionFn && actionFn.call(this, iocfg);
		},
		
		create: function(iocfg){
			
			iocfg.method = 'POST';
			iocfg.headers = {
				'Content-Type': 'application/json',
			};
			iocfg.data = Y.JSON.stringify(this.toJSON());
			
			Y.io('/data/project/create', iocfg);
		},
		
		read: function(iocfg){
			iocfg.method = 'GET';
			Y.io('/data/project/' + this.get('_id'), iocfg);
		},
		
		update: function(iocfg){
			iocfg.method = 'POST';
			iocfg.headers = {
				'Content-Type': 'application/json',
			};
			iocfg.data = Y.JSON.stringify(this.toJSON()),
			
			Y.io('/data/project/update', iocfg);
		},
		
		'delete': function(iocfg){
			iocfg.method = 'DELETE';
			Y.io('/data/project/' + this.get('_id'), iocfg);
		}
		
	}, {
		name: {},
		organization: {},
		tasks: {},
		team: {},
		businessNeed: {},
		businessRequirement: {},
		businessValue: {},
		constraints: {},
	});
}