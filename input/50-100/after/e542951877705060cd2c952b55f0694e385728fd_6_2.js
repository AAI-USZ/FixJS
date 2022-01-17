function(){
        //console.log('measuresView.render');	
        var data = {},
            compiledTemplate = _.template( measuresTemplate, data );

        $(this.el)
          .empty()
          .append( compiledTemplate );

        this.renderCreate();
        this.renderList();

        this.displayList();

        return this;
      }