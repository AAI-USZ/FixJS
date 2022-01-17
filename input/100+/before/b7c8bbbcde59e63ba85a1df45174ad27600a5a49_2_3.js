function(url) {
       var rover = this;
       var querys = rover.getUrlQuerys(url);
       if (querys == "" || Object.keys(querys).length <= 0 || Object.keys(querys)[0] == "" )
          return false; // failure

       // toggle splash
       splash = false;
       toggleSplashPage();

       // keep track of querys
       rover.urlQuerys = querys;

       // // set region
       // rover.displayMin = parseInt(querys['min']);
       // rover.displayMax = parseInt(querys['max']);
       // 
       // // set value of zoom slider
       // var zoomValue = rover.get('zoomMax') - (rover.get("displayMax")-rover.get("displayMin")) + rover.get('zoomMin') ;
       // rover.set({ 'zoomValue':zoomValue });
  //     $(rover.zoomer).slider("option", "value", zoomValue);
//       alert(zoomValue);
       // var zoomValue = rover.zoomMax - (rover.displayMax-rover.displayMin) + rover.zoomMin;
       // $(rover.zoomer).slider("option", "value", zoomValue);
       // rover.bufferSize = (rover.displayMax - rover.displayMin) * rover.bufferMultiple;
       // 
       // // set rover min/max
       // if(querys['min'] && querys['max']) {
       //    rover.min = Math.max(rover.displayMin - rover.bufferSize,1);
       //    rover.max = parseInt(rover.displayMax + rover.bufferSize);
       // }

       // add Das sources                   
       var urls = querys['urls'].split(',');
       var names = querys['names'].split(',');
       var types = querys['types'].split(',');
       var displays = querys['display'].split(',');

       // set display
       for (var i=0; i < displays.length; i++) {   
          if( /json/.exec(urls[i]) )
             var protocol = 'json';
          else
             var protocol = 'das';

          var display = displays[i].toLowerCase();
          if (display == 'none') display = 'collapse';
         // var track = rover.addTrack(display);      
         var track = new window.BTrack({
            url: urls[i],
            chromosome: querys['segment'],
            name: names[i],
            typefilter: types[i],
          //  min: rover.get('min'),
          //  max: rover.get('max')
          });

          rover.tracks.add( track );

          //track.center.chart.fetch( {data: $.param({min:rover.min, max:rover.max})} );
          track.center.chart.fetch();

          // if (protocol == 'json')
          //    track.setSource(new JsonSource(names[i], urls[i], querys['segment']));
          // else
          //    track.setSource(new DasSource(names[i], urls[i], types[i], querys['segment']));
          // if ( track.source.url )
          //    track.source.fetch(rover.min, rover.max, track.initSource, track, 'center', true);         
       }

       // success
       return true;
    }