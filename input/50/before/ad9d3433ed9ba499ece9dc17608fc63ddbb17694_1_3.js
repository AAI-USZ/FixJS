function() {
      expect('click').not.toHaveBeenTriggeredOn($('#clickme'))
      expect('click').not.toHaveBeenTriggeredOn($('#clickme').get(0))
    }