function(){
        //console.log('measuresView.render');	
        var data = {},
            compiledTemplate = _.template( measuresTemplate, data );

        $(this.el)
          .empty()
          .append( compiledTemplate );

        this.showList();

        return this;
      }