function() {
         // current view
         this.center = {};
//         this.center.chart = this.setupDefaultScribl( new Scribl(this.get('canvas'), this.get('canWidth')) );
         this.center.chart = new window.BSource( {trackId: this.cid} );    
         // right buffer
         this.right = {};
         this.right.chart = new window.BSource( {trackId: this.cid} );
         // left buffer
         this.left = {};
         this.left.chart = new window.BSource( {trackId: this.cid} );
         
      }