function(){
                        events.fire(new Event(EventCode.GRAPH.SELECTED,{uri:graph},self));
                         var list = [];
                         for(var i in data) {
                             if(data[i].uri.value != event.data.uri) {
                                list.push(data[i].uri.value);
                             }
                         }
                        events.fire(new Event(EventCode.CONCEPT.UPDATED,{uris:list}));
                         events.fire(new Event(EventCode.SCHEME.DELETED,{uri:event.data.uri}));
                        close();
                    },function(){popups.alert("Alert","Could not delete scheme!")}