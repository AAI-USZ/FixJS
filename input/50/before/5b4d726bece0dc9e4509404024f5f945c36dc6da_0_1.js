function checkIt(){
      if(that.$el.parent()){
        that.trigger('DOMContentLoaded');
        return;
      }
      setTimeout(arguments.callee, 50);
    }