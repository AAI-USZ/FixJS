function(x){
    if(re.is(x)){
      return this.$el.css('left', x);
    }

    return this.$el.position().left;
  }