function(x) {
                       if (x.get("http://purl.org/NET/c4dm/event.owl#place") &&
                           x.get("http://purl.org/NET/c4dm/event.owl#place").filter(function(y) { return y.get('http://www.w3.org/2000/01/rdf-schema#label'); })) {
                           var labels = x.get("http://purl.org/NET/c4dm/event.owl#place").filter(function(y) { return y.get('http://www.w3.org/2000/01/rdf-schema#label'); });
                           return to_model({ 'place name' : labels[0] });
                       }
                   }