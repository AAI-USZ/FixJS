function(target){
    var that = this;
    this.$el.appendTo(target);
    function checkIt(){
      if(that.$el.parent()){
        that.trigger('DOMContentLoaded');
        return;
      }
      setTimeout(arguments.callee, 50);
    }
    setTimeout(checkIt(), 50);
  }