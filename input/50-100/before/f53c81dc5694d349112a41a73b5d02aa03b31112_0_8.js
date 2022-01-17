function(e) {
			var $this = $(this);

			$tabsNavLis.removeClass('active');
			$this.addClass('active');
			$tabContent.hide();
			
			$( $this.find('a').attr('href') ).fadeIn();

			e.preventDefault();
		}