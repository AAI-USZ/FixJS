function(track) { 
            if (track.chart.ntsToPixels() > 70) {
               track.chart.previousDrawStyle = track.getDrawStyle();
               track.chart.drawStyle = 'line';            
            } else if (track.previousDrawStyle) {
               track.chart.drawStyle = track.chart.previousDrawStyle;
               track.chart.previousDrawStyle = undefined;
            }
            return false;
         }