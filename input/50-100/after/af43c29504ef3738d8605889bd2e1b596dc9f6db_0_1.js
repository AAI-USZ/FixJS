function() {
                    events.fire(new Event(EventCode.SCHEME.CREATED, {parent:graph,uri:uri,type:'scheme'}));
                    events.fire(new Event(EventCode.GRAPH.UPDATED, {uris:[graph]}));
                    close();
                }