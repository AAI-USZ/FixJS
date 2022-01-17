function() {
                        events.fire(new Event(EventCode.GRAPH.SELECTED, {uri:uri}));
                        close();
                    }