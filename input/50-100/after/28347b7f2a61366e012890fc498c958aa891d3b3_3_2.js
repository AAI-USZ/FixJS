function() {
          // var scribl = this.model.center.chart.get('scribl');          
          var scribl = this.model.get('scribl');          
          var renderedContent = this.template( $.extend(this.model.toJSON(), {thousandGSources:rover.thousandGSources}) );
          $(this.el).html(renderedContent);
          this.$('select').selectBox();
          scribl.setCanvas(this.$('canvas')[0]);
          scribl.canvas.width = rover.getWidth();

          return this;       
       }