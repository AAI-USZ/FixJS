function(state){
        //console.log('measuresView.renderState');
        $(this.el).find(this.containers.viewstack)
          .empty()
          .append(state);
        this.delegateEvents(this.events);    
      }