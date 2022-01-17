function() {
       var rover = this;

       // get urls
       var sourceUrls = [];
       for ( var i in rover.tracks )
          sourceUrls.push( rover.tracks[i].source.url );

       // get names
       var sourceNames = [];
       for ( var i in rover.tracks )
          sourceNames.push( rover.tracks[i].source.name );

       // get types
       var types = [];
       for ( var i in rover.tracks )
          types.push( rover.tracks[i].source.typeFilter );

       var trackOptions = [];
       for ( var i in rover.tracks )
            trackOptions.push( rover.tracks[i].drawStyle );                                    

       // get min, max, chromosome      
       var min = rover.getDisplayMinNts();
       var max = rover.getDisplayMaxNts();
       var chr = rover.getChromosome();

       // construct query string
       var queryStr = "?"
       queryStr += "urls=" + sourceUrls.join(',');
       queryStr += "&names=" + sourceNames.join(',');
       queryStr += "&min=" + min;
       queryStr += "&max=" + max;
       queryStr += "&display=" + trackOptions.join(',');
       queryStr += "&segment=" + chr;
       queryStr += "&types=" + types.join(',');

       return queryStr;
    }