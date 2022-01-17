function(){
        //console.log('measureView.render');	
        var data = {},
            compiledTemplate = _.template( measureTemplate, data );

        $(this.el)
          .empty()
          .append( compiledTemplate );

        this.showShow();

        return this;
      }