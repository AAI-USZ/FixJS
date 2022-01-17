function(y){
    if(re.is(y)){
      return this.$el.css('top', y);
    }
    return this.$el.position().top;
  }