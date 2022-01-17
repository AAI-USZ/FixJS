function() {
    beforeEach(function() {
      setFixtures(sandbox().html('<a id="clickme">Click Me</a> <a id="otherlink">Other Link</a>'))
      spyOnEvent($('#clickme'), 'click')
    })

    it('should pass if the event was prevented on the object', function() {
      $('#clickme').bind('click', function(event) {
        event.preventDefault()
      })
      $('#clickme').click()
      expect('click').toHaveBeenPreventedOn($('#clickme'))
    })

    it('should pass negated if the event was never prevented', function() {
      $('#clickme').click()
      expect('click').not.toHaveBeenPreventedOn($('#clickme'))
    })

    it('should pass negated if the event was prevented on another non-descendant object', function() {
      $('#otherlink').bind('click', function(event) {
        event.preventDefault()
      })
      $('#clickme').click()
      expect('click').not.toHaveBeenPreventedOn($('#clickme'))
    })
  }