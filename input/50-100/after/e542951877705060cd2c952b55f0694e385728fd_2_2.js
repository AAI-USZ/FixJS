function(){
        //console.log('measureView.render');	
        //console.log('>> this.model:', this.model);
        var data = {},
            compiledTemplate = _.template( measureTemplate, data );

        $(this.el)
          .empty()
          .append( compiledTemplate );

        this.renderShow();
        this.renderEdit();

        this.displayShow();

        return this;
      }