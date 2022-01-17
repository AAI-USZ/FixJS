function(n) {                    
                var parts = n.method.split(':');
                var path = parts[0];
                var event = parts[1];
                var data = n.params[0];
                var desc = {
                    path: path
                };
                if(path.split('.').length < 20) {
                    if(event=='create') {
                        desc.value = data.value;
                        desc.schema = data.schema;
                        Radar[data.type+'sController'].create(desc);
                    }
                    else if(event=='delete') {
                        Radar[data.type+'sController'].destroy(desc);
                    }
                    else if(event=='value') {
                        desc.value = data;
                        Radar.statesController.updateChild(desc);
                    }
                    else if(event=='schema') {
                        desc.schema = data;
                        Radar.statesController.updateChild(desc);
                    }
                }
                else {
                    Ember.Object.create({
                        path: path
                    });
                }
            }