function() {
      $('#clickme').bind('click', function(event) {
        event.preventDefault()
      })
      $('#clickme').click()
      expect('click').toHaveBeenPreventedOn($('#clickme'))
      expect('click').toHaveBeenPreventedOn('#clickme')
    }