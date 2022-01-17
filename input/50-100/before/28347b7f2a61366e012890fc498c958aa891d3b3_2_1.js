function() {
      var track = rover.tracks.getByCid(this.get('trackId'));
      
      // trigger fetching event
      track.trigger('fetching');            
      return track.get('url') + '?' + $.param({segment:track.get('chromosome')});
   }