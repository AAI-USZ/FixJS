function() {
      setFixtures(sandbox().html('<a id="clickme">Click Me</a> <a id="otherlink">Other Link</a>'))
      spyOnEvent($('#clickme'), 'click')
      spyOnEvent($('#otherlink'), 'click')
    }