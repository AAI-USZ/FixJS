function (err, response) {
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
			                Y.Resource.lastCount = parsed.lastResourceCount;
			                
			                delete parsed.tasks;
			                delete parsed.team;

			                self.setAttrs(parsed, options);
			        
							Y.ProjectCalendar.data = self.get('calendar');
			        
			                self.changed = {};
		                    self.fire(EVT_SAVE, facade);
	                    }
	
	    
	                }
	
	                callback && callback.apply(null, arguments);
	            }