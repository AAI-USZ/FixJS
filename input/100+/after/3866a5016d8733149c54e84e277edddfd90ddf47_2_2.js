function (target) {
        var active
          , selector
          , newTarget	//KWD - for Joomla compatibility
	
		newTarget = window.location.pathname + target
		target = newTarget
		// Now target has the url path plus the # anchor
		// so it matches the joomla menu requirements - external URL, /somepage#somelocation
        this.activeTarget = target

        $(this.selector)
          .parent('.active')
          .removeClass('active')

        selector = this.selector
          + '[data-target="' + target + '"],'
          + this.selector + '[href="' + target + '"]'

        active = $(selector)
          .parent('li')
          .addClass('active')

        if (active.parent('.dropdown-menu'))  {
          active = active.closest('li.dropdown').addClass('active')
        }

        active.trigger('activate')
      }