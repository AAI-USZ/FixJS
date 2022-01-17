function() {

		var $container = $('#portfolio-items');

		if( $container.length ) {

			var $itemsFilter = $('#portfolio-items-filter'),
				mouseOver;

			// Copy categories to item classes
			$('article', $container).each(function(i) {
				var $this = $(this);
				$this.addClass( $this.attr('data-categories') );
			});

			// Run Isotope when all images are fully loaded
			$(window).on('load', function() {

				$container.isotope({
					itemSelector : 'article',
					layoutMode   : 'fitRows'
				});

			});

			// Filter projects
			$itemsFilter.on('click', 'a', function(e) {
				var $this         = $(this),
					currentOption = $this.attr('data-categories');

				$itemsFilter.find('a').removeClass('active');
				$this.addClass('active');

				if( currentOption ) {
					if( currentOption !== '*' ) currentOption = currentOption.replace(currentOption, '.' + currentOption)
					$container.isotope({ filter : currentOption });
				}

				e.preventDefault();
			});

			$itemsFilter.find('a').first().addClass('active');
			$itemsFilter.find('a').not('.active').hide();

			// On mouseover (hover)
			$itemsFilter.on('mouseenter', function() {
				var $this = $(this);

				clearTimeout( mouseOver );

				// Wait 100ms before animating to prevent unnecessary flickering
				mouseOver = setTimeout( function() {
					if( $(window).width() >= 960 )
						$this.find('li a').stop(true, true).slideHorzShow(300);
				}, 100);
			}).on('mouseleave', function() {
				clearTimeout( mouseOver );

				if( $(window).width() >= 960 )
					$(this).find('li a').not('.active').stop(true, true).slideHorzHide(150);
			});

		}

	}