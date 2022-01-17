function(html) {
    var rootElement = $(html);
    var elements = [];
    if (rootElement.hasClass(this.prefix)) {
      elements.push(rootElement);
    }
    elements.concat(rootElement.find('.' + this.prefix));
    
    $(elements).each(function(i,v) {
      var repeat = $(v);
      repeat.css('background-color: rgba(255,0,255,0.4)');
      $('body').append(repeat);
    });
  }