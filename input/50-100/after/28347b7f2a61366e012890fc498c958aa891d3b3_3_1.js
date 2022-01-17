function() {
         // setup scribl view up
         var chart = this.createScribl();        
         this.set({scribl: chart});         
         this.set({chromosome: rover.getChromosome() });

         // current view
         this.center = {};
//         this.center.chart = this.setupDefaultScribl( new Scribl(this.get('canvas'), this.get('canWidth')) );
         this.center.chart = new window.BSource( {trackId: this.cid} );    
         // this.center.chart = undefined;
         // right buffer
         this.right = {};
         this.right.chart = undefined; //new window.BSource( {trackId: this.cid} );
         // left buffer
         this.left = {};
         this.left.chart = undefined; //new window.BSource( {trackId: this.cid} );
         
      }