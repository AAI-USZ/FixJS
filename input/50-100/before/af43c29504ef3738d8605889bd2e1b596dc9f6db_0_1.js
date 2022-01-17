function() {
                    events.fire(new Event(EventCode.SCHEME.CREATED, {parent:parent,uri:uri,type:'scheme'}));
                    events.fire(new Event(EventCode.CONCEPT.UPDATED,{uris:[parent,uri]}));
                    close();
                }