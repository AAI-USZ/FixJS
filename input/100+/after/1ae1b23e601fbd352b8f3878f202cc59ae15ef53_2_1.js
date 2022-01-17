function (err, response) {
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
	                Y.Resource.lastCount = parsed.lastResourceCount;
	                
	                delete parsed.tasks;
	                delete parsed.team;
	
	                self.setAttrs(parsed, options);
	                self.changed = {};
	
					Y.ProjectCalendar.data = self.get('calendar');
	
	                self.fire(EVT_LOAD, facade);
	            }
	
	            callback && callback.apply(null, arguments);
	        }