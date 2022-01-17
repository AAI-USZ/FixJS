function() {      
          var scribl = this.model.center.chart.get('scribl');
          scribl.drawStyle = this.model.get('drawStyle');
          scribl.glyph.text.color = this.model.get('textColor');
          scribl.glyph.color = this.model.get('glyphColor');
          var width = rover.getWidth();
          scribl.width = width;
          scribl.scale.min = rover.get('min');
          scribl.scale.max = rover.get('max');            
          scribl.canvas.width = width;
          var scrollLeft = (rover.get('displayMin') - rover.get('min')) / (rover.get("max") - rover.get('min')) * rover.getWidth();
          rover.canvasContentDiv.scrollLeft = scrollLeft;
          scribl.canvas.height = scribl.getHeight();
          scribl.draw();
          this.$('.spinner').css('display', 'none');      
       }