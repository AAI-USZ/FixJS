function(rdfc, leafletMap) {
           /// put cool shtuff here.
           window.dse = rdfc;
           var b58 = rdfc.get_rdf('http://data.southampton.ac.uk/building/58.rdf');
           b58.fetch().then(function(data) {
               console.log(" omg data ", b58);
           });
           window.b58 = b58;
           new leafletMap.LeafletWidget( {el: $('#map'), attributes: {css: {height: "400px"}} })
           return {};
       }