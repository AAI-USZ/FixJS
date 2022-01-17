function(options) {
       var rover = this;
       this.tracks = new window.BTracks();
       // this.tracks.on("reset", this.updateCounts);

       this.roverDiv = options.viewer;
       this.zoomer = options.zoomer;
       this.scroller = options.scroller;
   //      this.minBufferSize = args['minBufferSize'] || 50000;

       //
       this.updatingLeft = false;
       this.updatingRight = false;
       this.scrollFunc = undefined;


       this.thousandGUrl = "http://bioinformatics.bc.edu/ngsserver";
       this.thousandGSources = [];

       // create container divs
       this.scrollInitialized = false;
      // this.setupDivs();

       // setup zoom slider
       //this.setupZoomSlider()

       // setup scroll slider
       $(this.scroller ).slider({
            min: -100,
            max: 100,
            value: 0,
            start: function(event, ui) {
               rover.scrollFunc = setInterval( function() {
                  var scrollPixels = $(rover.scroller).slider('option', 'value') / 100 * rover.maxScrollSpeed;
                  rover.canvasContentDiv.scrollLeft += scrollPixels;
       		  },20)
            },
            stop: function() { window.clearInterval(rover.scrollFunc); $(rover.scroller ).slider('option', 'value', 0);},
        });

       // make tracks sortable
       // $(rover.canvasListDiv).sortable({
       //    update: function() { rover.updateLabelPositions(); }
       // });

       this.hideScrollBar();
       // see if browser is internet explorer and if so give alert
       this.testIE();

       var querys = rover.getUrlQuerys(location.href);
       
       if (querys != undefined) {
          var displayMin = parseInt(querys['min']);
          var displayMax = parseInt(querys['max']);
          
          // set value of bufferSize
          var bufferSize = (displayMax - displayMin) * rover.get('bufferMultiple');
          
          rover.set({ min: Math.max(displayMin - bufferSize,1),
                      max: parseInt(displayMax + bufferSize),
                      displayMin: displayMin,
                      displayMax: displayMax
                   });
       }
       
       //rover.set({ width: rover.getWidthWithBuffers() });
    }