function() {
       var rover = this;

       // get urls
       var sourceUrls = [];
       var sourceNames = [];
       var sourceTypes = [];
       var trackOptions = [];
       rover.tracks.each( function(track) {
          sourceUrls.push(   track.get('url')        );
          sourceNames.push(  track.get('name')       );
          sourceTypes.push(  track.get('typeFilter') );
          trackOptions.push( track.get('drawStyle')  );
       })

       // get min, max, chromosome      
       var min = rover.get('displayMin')
       var max = rover.get('displayMax')
       var chr = rover.getChromosome();

       // construct query string
       var queryStr = "?"
       queryStr += "urls=" + sourceUrls.join(',');
       queryStr += "&names=" + sourceNames.join(',');
       queryStr += "&min=" + min;
       queryStr += "&max=" + max;
       queryStr += "&display=" + trackOptions.join(',');
       queryStr += "&segment=" + chr;
       queryStr += "&types=" + sourceTypes.join(',');

       return queryStr;
    }