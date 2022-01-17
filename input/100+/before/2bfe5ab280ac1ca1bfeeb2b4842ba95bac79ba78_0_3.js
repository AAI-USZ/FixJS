function (event) {
    var $this = $(this),
        $dropdown = $this.closest('div.custom.dropdown'),
        $select = $dropdown.prev();
    
    event.preventDefault();

    if (false == $select.is(':disabled')) {
        $dropdown.toggleClass('open');

        if ($dropdown.hasClass('open')) {
          $(document).bind('click.customdropdown', function (event) {
            $dropdown.removeClass('open');
            $(document).unbind('.customdropdown');
          });
        } else {
          $(document).unbind('.customdropdown');
        }
        return false;
    }
  }