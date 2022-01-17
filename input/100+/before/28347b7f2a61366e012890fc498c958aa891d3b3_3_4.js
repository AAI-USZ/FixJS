f             // test if rover attr min or max is changing
             if( model.cid == rover.cid && !("min" in model._changed) && !("max" in model._changed) )
               return
          
             var scribl = this.model.get('scribl');
             //if (scribl.getFeatures().length == 0 && this.model.center.chart != undefined) {
             if ( this.model.parsed ) {
               var scribl = this.model.get('scribl')
               scribl.setCanvas(this.$('canvas')[0]);
               if ( scribl.getFeatures().length > 0 ) {
                  scribl.removeEventListeners('mouseover');
                  delete this.model.get('scribl')
               
                  // create new scribl;
                  var scribl = this.model.createScribl();         
                  this.model.set({scribl: scribl}, {silent:true});
               }
//               scribl.removeEventListeners('mouseover');
               _.each(this.model.center.chart.get('features'), function(ft) { scribl.addFeature( ft ); });
               this.model.parsed = false;
             }

             scribl.laneSizes = this.model.get('laneSizes');
             scribl.drawStyle = this.model.get('drawStyle');
             scribl.glyph.text.color = this.model.get('textColor');
             scribl.glyph.color = this.model.get('glyphColor');
             
             var width = rover.getWidth();
             scribl.width = width;

             scribl.scale.min = rover.get('min');
             scribl.scale.max = rover.get('max');  

             scribl.setCanvas(this.$('canvas')[0]);          
             if (!rover.updatingLeft && !rover.updatingRight) { 
                scribl.canvas.width = width;                
             } else {
                rover.updatingLeft = false;
                rover.updatingRight = false;
             }
//             alert('canvas width = ' + scribl.canvas.width + ' wdith = ' + width);
             scribl.canvas.height = scribl.getHeight();
          
             scribl.draw();
   //          this.$el.css('height', scribl.getHeight() + 10);
             this.$('.spinner').css('display', 'none');
             // trigger scrollLeft to ensure that the div has the correct scrollLeft value
             this.rover.trigger('scrollLeft');
         
//                   $('.rover-track-menu').trigger('mouseover');
       },
