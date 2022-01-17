function() {
        //console.log('measureView.renderEdit');

        $(this.el).find(this.containers.edit)
          .empty()
          .append(this.measureEditView.render().el); 
      }