function() {

		var $tabsNav    = $('.tabs-nav'),
			$tabsNavLis = $tabsNav.children('li'),
			$tabContent = $('.tab-content');

		$tabContent.hide();
		$tabsNavLis.first().addClass('active').show();
		$tabContent.first().show();

		$tabsNavLis.on('click', function(e) {
			var $this = $(this);

			$tabsNavLis.removeClass('active');
			$this.addClass('active');
			$tabContent.hide();
			
			$( $this.find('a').attr('href') ).fadeIn();

			e.preventDefault();
		});

	}