function(x){
    if(re.is(x)){
      this.$el.css('left', x);
      return this;
    }

    return this.$el.position().left;
  }