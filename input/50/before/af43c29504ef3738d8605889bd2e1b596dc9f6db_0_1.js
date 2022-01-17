function(){
                    events.fire(new Event(EventCode.CONCEPT.UPDATED,{uris:[graph]}));
                    updated = true;
                },function(){alert("could not set language")}