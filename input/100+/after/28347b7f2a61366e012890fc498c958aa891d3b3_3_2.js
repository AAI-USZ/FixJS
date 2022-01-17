function() {
         // create new scribl;
         var chart = new Scribl();
         chart.offset = 0;
         chart.scale.off = true;
         chart.scale.pretty = false;
         var roverTrack = this;
         chart.trackHooks.push( function(track) { 
            if (track.chart.ntsToPixels() > 70) {
               track.chart.previousDrawStyle = track.getDrawStyle();
               track.chart.drawStyle = 'line';            
            } else if (roverTrack.format == 'vcf' && track.chart.ntsToPixels() > 16) {
               track.chart.previousDrawStyle = track.getDrawStyle();
               track.chart.drawStyle = 'line';
            } else if (track.previousDrawStyle) {
               track.chart.drawStyle = track.chart.previousDrawStyle;
               track.chart.previousDrawStyle = undefined;
            }
            return false;
         });
         
         return chart;
      }