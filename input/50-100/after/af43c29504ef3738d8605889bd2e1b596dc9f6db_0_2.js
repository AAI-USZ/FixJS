function() {
                    events.fire(new Event(EventCode.CONCEPT.CREATED, {parent:parent,uri:uri,type:'top-concept'}));
                    events.fire(new Event(EventCode.SCHEME.UPDATED, {uris:[parent]}));
                    close();
                }