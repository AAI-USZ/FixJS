function () {
      var $this = $(this)
        , data = $this.data('modal')
        , options = typeof option == 'object' && option
      if (!data) $this.data('modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option]()
      else data.show()
    }