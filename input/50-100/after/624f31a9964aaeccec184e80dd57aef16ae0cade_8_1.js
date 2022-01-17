function(){
    textile.set("This\n\nThat")
      .selectAll()
      .change(".formatBlock", "h1")
      .equal('h1. This\n\nh1. That')
      .select('h1. This')
      .click('.alignCenter')
      .equal('h1(center). This\n\nh1. That')
      .click('.alignRight')
      .equal('h1(right). This\n\nh1. That')
      .selectAll()
      .click('.alignLeft')
      .equal('h1(left). This\n\nh1(left). That')
      .select('That')
      .click('.alignCenter')
      .equal('h1(left). This\n\nh1(center). That');
  }