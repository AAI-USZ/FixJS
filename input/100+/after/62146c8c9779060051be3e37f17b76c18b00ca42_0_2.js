function () {
		resizePanel();
		jQuery.easing.def = "easeInOutQuart";
		scrollSections();
		setColorboxGroups();
		// Resize the containers on window resize
		$(window).resize(function() {
			resizePanel();
		});

		$('.scroll-pane').each(function(){
			$(this).jScrollPane({
				showArrows:true,
				autoReinitialise:true
			});
		});

		history.replaceState(
		{
			href : $('a[data-section].selected').attr('href'),
			section : $('a[data-section].selected').attr('data-section')
		},
		$('a[data-section].selected').attr('href')
		);

		handleState();
	}