function() {
      var track = rover.tracks.getByCid(this.get('trackId'));
      
      return track.get('url') + '?' + $.param({segment:track.get('chromosome')});
   }