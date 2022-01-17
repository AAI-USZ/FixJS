function(n) {                    
                var parts = n.method.split(':');
                var path = parts[0];
                var event = parts[1];
                var data = n.params[0];
                var desc = {
                    path: path
                };

                Radar.logEntriesController.add(Radar.LogEntry.create({
                    event: event,
                    path: path,
                    data: data
                }));
                
                if(event=='create') {               
                    desc.value = data.value;
                    desc.schema = data.schema;
                    Radar[data.type+'sController'].create(desc);
                }
                else if(event=='delete') {
                    Radar[data.type+'sController'].destroy(desc);
                }
                else if(event=='value') {
                    Radar.statesController.updateChild(desc);
                }
                else if(event=='schema') {
                    desc.schema = data;
                    Radar.statesController.updateChild(desc);
                }            
            }