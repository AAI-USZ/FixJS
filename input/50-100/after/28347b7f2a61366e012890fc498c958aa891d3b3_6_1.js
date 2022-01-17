function() {
      var track = rover.tracks.getByCid(this.get('trackId'));
     
      // trigger fetching event if main chart
//      if (track.center.chart.cid == this.cid)
//         track.trigger('fetching');

      return track.get('url') + '?' + $.param({segment:track.get('chromosome')});

   }