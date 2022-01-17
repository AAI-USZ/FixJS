function() {
      $('#otherlink').click()
      expect('click').not.toHaveBeenTriggeredOn($('#clickme'))
      expect('click').not.toHaveBeenTriggeredOn('#clickme')
    }