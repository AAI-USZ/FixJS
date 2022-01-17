function(){
                    events.fire(new Event(EventCode.GRAPH.UPDATED,{uris:[graph]}));
                    updated = true;
                },function(){alert("could not set language")}