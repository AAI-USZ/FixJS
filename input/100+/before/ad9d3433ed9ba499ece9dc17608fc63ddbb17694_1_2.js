function() {
    var handler
    beforeEach(function() {
      setFixtures(sandbox().html('<a id="clickme">Click Me</a> <a id="otherlink">Other Link</a>'))
      handler = function(){ }; // noop
    })

    it("should handle events on the window object", function(){
      $(window).bind("resize", handler)
      expect($(window)).toHandle("resize")
    })

    it('should pass if the event is bound', function() {
      $('#clickme').bind("click", handler)
      expect($('#clickme')).toHandle("click")
      expect($('#clickme').get(0)).toHandle("click")
    })
    
    it('should pass if the event is not bound', function() {
      expect($('#clickme')).not.toHandle("click")
      expect($('#clickme').get(0)).not.toHandle("click")
    })
    
    it('should pass if the namespaced event is bound', function(){
      $('#clickme').bind("click", handler); //another event for the click array
      $('#clickme').bind("click.NameSpace", handler)
      expect($('#clickme')).toHandle("click.NameSpace")
    })

    it('should not fail when events is empty', function() {
      $('#clickme').change(function() { })
      expect($('#clickme')).not.toHandle('click')
    })
  
    it('should recognize an event with multiple namespaces', function(){
      $('#clickme').bind("click.NSone.NStwo.NSthree", handler)
      expect($('#clickme')).toHandle("click.NSone")
      expect($('#clickme')).toHandle("click.NStwo")
      expect($('#clickme')).toHandle("click.NSthree")
      expect($('#clickme')).toHandle("click.NSthree.NStwo")
      expect($('#clickme')).toHandle("click.NStwo.NSone")
      expect($('#clickme')).toHandle("click")
    })

    it('should pass if a namespaced event is not bound', function() {
      $('#clickme').bind("click", handler); //non namespaced event
      $('#clickme').bind("click.OtherNameSpace", handler); //different namespaced event
      expect($('#clickme')).not.toHandle("click.NameSpace")
    })

    it('should handle event on any object', function(){
      var object = new function(){ }; // noop
      $(object).bind('click', function(){})
      expect($(object)).toHandle('click')
    })
  }