function(params) {

        this.scenes = [];
        // create models
        models = {}; //new Object;
        
        for (var m in TestPairs) {
          this.currentModel = planetPresets[m];
        
          for(var n in TestPairs[m]) {
            
            for(var j in TestPairs[m][n]) { break; }
            
            var tests = TestPairs[m][n],
            ul = $("#mainBox").append("<table>" + m + " " + n + "</table>"),
            i;
            
            this.loadPreset(planetPresets[m][n]);

            for(i in tests) { 

              model.setDate(tests[i].date);
              model.addDays(0.5);
              var longReal = Math.abs( model.planet.longitude-180 ),
              longRef =  Math.abs( Number(Utils.toDec( tests[i].longitude )) - 180 ),
              latReal = model.planet.latitude,
              latRef = Number( Utils.toDec(tests[i].latitude) ),
              colorLong = "#FFF",
              colorLat = "#FFF";
                 
              if ( Math.abs(longReal - longRef) > 0.4) colorLong="#F44";        
              if ( Math.abs(latReal - latRef) >= 0.16) colorLat="#F44";      
                          
              ul.append("<tr><td style='color:" + colorLong + ";'>" + (longReal - longRef).toFixed(2)  + 
                       "</td><td style='color:" + colorLat + ";'>"  + ( latReal - latRef).toFixed(2)  + 
  //                     "</td><td>"  + latRef.toFixed(2) +
                       "</td></tr>");                     
              
            }
          }
        }

    }