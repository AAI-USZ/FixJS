function(){
                    events.fire(new Event(EventCode.GRAPH.UPDATED,{uris:[graph]}));
                    settings.setLanguages(ls);
                    updated = true;
                    write();
                },function(){alert("could not set languages")}