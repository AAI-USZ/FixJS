function(state){
        //console.log('measureView.renderState');
        $(this.el).find(this.containers.viewstack)
          .empty()
          .append(state);
        this.delegateEvents(this.events);    
      }