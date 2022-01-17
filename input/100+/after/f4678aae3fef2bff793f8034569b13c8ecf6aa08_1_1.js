function(x) {
                       console.log(' place name ', x, x.get("http://purl.org/NET/c4dm/event.owl#place"));
                       if (x.get("http://purl.org/NET/c4dm/event.owl#place") &&
                           x.get("http://purl.org/NET/c4dm/event.owl#place").filter(function(y) { return y.get('http://www.w3.org/2000/01/rdf-schema#label'); })) {
                           // 
                           var labels = x.get("http://purl.org/NET/c4dm/event.owl#place").filter(function(y) {
                               // gett rid of values that dont have a label first, 
                               return y.get('http://www.w3.org/2000/01/rdf-schema#label');
                           }).map(function(y) {
                               // then get hte label
                               return y.get('http://www.w3.org/2000/01/rdf-schema#label')[0];
                           });;
                           console.log('labels ', labels);
                           return to_model({ 'place name' : labels[0] });
                       }
                   }