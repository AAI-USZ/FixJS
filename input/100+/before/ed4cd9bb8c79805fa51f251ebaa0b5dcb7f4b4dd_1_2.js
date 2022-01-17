function(e) {      
          // var scribl = this.model.center.chart.get('scribl');
          var scribl = this.model.get('scribl');
          if (scribl.getFeatures().length == 0 && this.model.center.chart != undefined)
            _.each(this.model.center.chart.get('features'), function(ft) { scribl.addFeature( ft ); });
          scribl.laneSizes = this.model.get('laneSizes');
          scribl.drawStyle = this.model.get('drawStyle');
          scribl.glyph.text.color = this.model.get('textColor');
          scribl.glyph.color = this.model.get('glyphColor');
          var width = rover.getWidth();
          scribl.width = width;
          scribl.scale.min = rover.get('min');
          scribl.scale.max = rover.get('max');  
          scribl.setCanvas(this.$('canvas')[0]);          
          scribl.canvas.width = width;
          scribl.canvas.height = scribl.getHeight();
          scribl.draw();
//          this.$el.css('height', scribl.getHeight() + 10);
          this.$('.spinner').css('display', 'none');
       }