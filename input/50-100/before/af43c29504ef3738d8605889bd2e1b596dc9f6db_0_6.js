function(){
                    events.fire(new Event(EventCode.CONCEPT.UPDATED,{uris:[graph]}));
                    settings.setLanguages(ls);
                    updated = true;
                    write();
                },function(){alert("could not set languages")}