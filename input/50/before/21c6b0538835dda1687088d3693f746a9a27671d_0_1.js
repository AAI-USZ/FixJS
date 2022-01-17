function(event){
    return window.Touch ? event.originalEvent.touches[0].pageX : event.pageX;
  }