function(Y){
	var EVT_LOAD = 'load',
		EVT_SAVE = 'save';
	
	Y.Project = Y.Base.create('project', Y.Model, [], {
		
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
	                Y.Task.lastCount = parsed.lastTaskCount;
	                
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

		save: function (options, callback) {
	        var self = this;
	
	        // Allow callback as only arg.
	        if (typeof options === 'function') {
	            callback = options;
	            options  = {};
	        }
	
	        options || (options = {});
	
	        self._validate(self.toJSON(), function (err) {
	            if (err) {
	                callback && callback.call(null, err);
	                return;
	            }
	
	            self.sync(self.isNew() ? 'create' : 'update', options, function (err, response) {
	                var facade = {
	                        options : options,
	                        response: response
	                    },
	
	                    parsed;
	
	                if (err) {
	                    facade.error = err;
	                    facade.src   = 'save';
	
	                    self.fire(EVT_ERROR, facade);
	                } else {
	                    // Lazy publish.
	                    if (!self._saveEvent) {
	                        self._saveEvent = self.publish(EVT_SAVE, {
	                            preventable: false
	                        });
	                    }
	
	                    if (response) {
	                        parsed = facade.parsed = self.parse(response);
	                
			                self.get('tasks').reset(parsed.tasks);
			                Y.Task.lastCount = parsed.lastTaskCount;
			                
			                self.get('team').reset(parsed.team);
			                Y.Resource.lastCount = 0;
			                
			                delete parsed.tasks;
			                delete parsed.team;

			                self.setAttrs(parsed, options);
			                self.changed = {};
		                    self.fire(EVT_SAVE, facade);
	                    }
	
	    
	                }
	
	                callback && callback.apply(null, arguments);
	            });
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
			
			var data = this.toJSON();
			data.lastTaskCount = 0;
			
			iocfg.data = Y.JSON.stringify(data);
			
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
			
			var data = this.toJSON();
			data.lastTaskCount = Y.Task.lastCount;
			
			iocfg.data = Y.JSON.stringify(data);
			
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
		lastTaskCount: {},
	});
}