function ( e ) {
      var $this = $(this), href
        , $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
        , option = $target.data('modal') ? 'toggle' : $.extend({}, $target.data(), $this.data())
      if(option == 'toggle') {
        $.extend($target.data('modal').options, $this.data())
      }

      e.preventDefault()
      $target.modal(option)
    }