function(){
                    events.fire(new Event(EventCode.GRAPH.UPDATED,{uris:[graph]}));
                    settings.setLanguages(ls2);
                    updated = true;
                    write();
                },function(){alert("could not set languages")}