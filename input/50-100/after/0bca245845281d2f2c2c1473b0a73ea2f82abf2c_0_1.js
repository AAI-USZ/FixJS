function(calCollection) {
                       calCollection.models.map(function(calendar) {
                           calendar.eventCollection.fetch().then(function(eventCollection) {
                               eventCollection.models.map(function(event) {
                                   v.collection.add(event);
                               });
                           });
                       });
                   }