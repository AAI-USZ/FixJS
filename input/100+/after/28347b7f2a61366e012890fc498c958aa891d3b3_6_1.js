function(response) {
      // call classes parents parse method
      window.BSourceJson.__super__.parse.call(this, response);

      //         var scribl = this.get('scribl');

      // delete old scriblTracks
      //       delete scribl.tracks[0];

      // add new scriblTracks and set default drawStyle
      //     var scriblTrack = scribl.addTrack();    // here refers to Scribl::Track not Rover::Track
      var track = rover.tracks.getByCid(this.get('trackId'));
      var urlArray = track.get('url').split('.');
      var format = urlArray.pop()
      
      if (format == 'gz')
         format = urlArray.pop();
         
      track.format = format;

      if (format == 'bam')
         this.parseBam(response);
      else if (format == 'vcf')
         this.parseVcf(response);

      if (this.drawOnParse) {
         this.drawOnParse = false;
         track.center.chart.set({features: this.get('features')});
      }
      track.trigger('fetched');
      return {};
   }