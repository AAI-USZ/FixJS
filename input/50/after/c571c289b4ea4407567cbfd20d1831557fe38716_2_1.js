function(rdfc) {
           window.dse = rdfc; // DEBUG: remove.
           var c = rdfc.get_rdf('http://data.southampton.ac.uk/building/58.rdf');
           c.fetch().then(function() {});           
           return {};
       }