function(e){
	e.preventDefault();

	var $this = $(this),
		$block = $this.closest('.faq-block');

	if($block.hasClass('active') || navigating === true) return false;

	var	$ans = $this.siblings('.faq-a'),
		$links = $('.faq-q'),
		$blocks = $('.faq-block');
		$blockWrapper = $block.parent(),
		$active = $('.faq-block.active'),
		$tab = $('.tabs-content > .active'),
		offX = $block.position().left,
		offY = $block.position().top;

	navigating = true;

	if(!$tab.data('height')) $tab.data('height', $tab.height());

	if($active.length > 0){
		$active.fadeOut(400, function(){
			$active.find('.faq-a').css('display', 'none');

			$active
				.removeClass('active')
				.css({
					'top': '',
					'left': '',
					'bottom': ''
				})
				.fadeIn();

			if($tab.height() !== $tab.data('height')){
				$tab.animate({
					'height' : $tab.data('height')
				}, 300, function(){
					showQ();
				});
			} else {
				showQ();
			}
		});
	} else {
		showQ();
	}

	function showQ(){
		$links.removeClass('no-vertical');
		$this.addClass('no-vertical');

		$blockWrapper.height($blockWrapper.height());
		$blocks.removeClass('active');
		$block
			.addClass('active')
			.css({
				'left' : offX,
				'top' : offY
			})
			.animate({
				'left' : +470
			}, 800, function(){
				$ans.fadeIn(checkHeight);
			});
	}

	function checkHeight(){
		var blockHeight = $block.height(),
			blockOffset = $block.offset().top,
			tabHeight = $tab.height(),
			tabOffset = $tab.offset().top;

		if(!$block.data('height')){
			$block.data('height', blockHeight);
			$block.data('offset', blockOffset + 10);
		}

		if(blockHeight > tabHeight){
			var diff = blockHeight - tabHeight + 10;

			$tab.animate({
				'height': tabHeight + diff
			}, 200);

			$block.css('top', '').animate({
				'bottom' : 15
			}, 400);
		}
		else if(blockHeight + blockOffset > tabOffset + tabHeight){
			$block.css('top', '').animate({
				'bottom' : 15
			}, 400);
		}
		navigating = false;
	}

}