function() {
          //console.log('measureEditView.renderOverlay'); 
          $(this.el).find(this.containers.overlay)
            .empty()
            .append(this.overlayView.render().el);
        }