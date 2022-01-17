function() {
                        events.fire(new Event(EventCode.GRAPH.SELECTED, {uri:uri}));
                        events.fire(new Event(EventCode.CONCEPT.UPDATED,{uris:[uri]}));
                        close();
                    }