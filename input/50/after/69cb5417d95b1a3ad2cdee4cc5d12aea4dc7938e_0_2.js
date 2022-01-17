function(y){
    if(re.is(y)){
      this.$el.css('top', y);
      return this;
    }
    return this.$el.position().top;
  }