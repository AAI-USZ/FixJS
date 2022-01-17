function(e) {
          var track = this.model;
          var newDrawStyle = e.srcElement.getAttribute('data-drawstyle');          
          track.set( {drawStyle:newDrawStyle} );
       }