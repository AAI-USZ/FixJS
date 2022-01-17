function(){
          //console.log('measureEditView.render');	
          var data = this.model.toJSON(),
              compiledTemplate;

          compiledTemplate = _.template( measureEditTemplate, data );

          $(this.el)
            .empty()
            .append( compiledTemplate );
          
          this.renderLists();
          this.renderCards();
          this.renderOverlay();

          return this;
        }