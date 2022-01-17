function processScroll() {
	  var i, scrollTop = $win.scrollTop()
	  if (scrollTop >= navTop && !isFixed) {
	    isFixed = 1
	    $nav.addClass('subnav-fixed')
			$hiddenName.removeClass('hide')
	  } else if (scrollTop <= navTop && isFixed) {
	    isFixed = 0
	    $nav.removeClass('subnav-fixed')
			$hiddenName.addClass('hide')
	  }
	}