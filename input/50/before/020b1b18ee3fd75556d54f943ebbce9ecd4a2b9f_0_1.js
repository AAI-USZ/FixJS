function(){
          data.handlers.splice(data.handlers.indexOf(this.handler));
          delete data.spiedEvents[[this.selector, this.eventName]];
        }