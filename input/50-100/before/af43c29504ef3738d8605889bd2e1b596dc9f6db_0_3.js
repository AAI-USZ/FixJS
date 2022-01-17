function() {
                    events.fire(new Event(EventCode.CONCEPT.CREATED, {parent:parent,uri:uri,type:'concept'}));
                    events.fire(new Event(EventCode.CONCEPT.UPDATED,{uris:[parent,uri]}));
                    close();
                }