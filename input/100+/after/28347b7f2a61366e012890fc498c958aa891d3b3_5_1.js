function(options) {
      var track = rover.tracks.getByCid(this.get('trackId'));
      var dataArr = options.data.split('&');
      var data = {};
      // parse min and max
      for ( var i in dataArr) {
         var pair = dataArr[i].split('=');
         data[pair[0]] = pair[1];
      }
      var fullUrl = track.get('url') + 
                    '/features?segment=' +
                    track.get('chromosome') +
                    ':'  + 
                    data.min +
                    "," +
                    data.max +
                    ';type=' + rover.get('typeFilter') || '';                    

      return fullUrl;
   }