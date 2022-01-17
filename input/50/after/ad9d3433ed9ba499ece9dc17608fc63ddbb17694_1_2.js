function() {
      $('#clickme').click()
      expect('click').toHaveBeenTriggeredOn($('#clickme'))
      expect('click').toHaveBeenTriggeredOn('#clickme')
    }