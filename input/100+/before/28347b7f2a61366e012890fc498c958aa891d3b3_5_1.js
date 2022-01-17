function() {
      var track = rover.tracks.getByCid(this.get('trackId'));
      var fullUrl = track.get('url') + 
                    '/features?segment=' +
                    track.get('chromosome') +
                    ':'  + 
                    rover.get('min') +
                    "," +
                    rover.get('max') +
                    ';type=' + 
                    ''
      
      // trigger fetching event
      track.trigger('fetching');      

      return fullUrl;
   }