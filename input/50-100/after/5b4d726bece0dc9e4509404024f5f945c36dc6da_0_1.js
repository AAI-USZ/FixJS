function(target){
    var that = this;
    this.$el.appendTo(target);
    function checkIt(){
      if(!that.$el.parentsUntil('body') || !$.isReady){
        setTimeout(arguments.callee, 50);
        return;
      }
      that.trigger('DOMContentLoaded');
    }
    setTimeout(checkIt, 50);
  }