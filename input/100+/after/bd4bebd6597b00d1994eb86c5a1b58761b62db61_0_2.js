function(){

var tabs = $('#tabs-template').html();

_.templateSettings = {
	interpolate : /\{\{(.+?)\}\}/g,      // print value: {{ value_name }}
	evaluate    : /\{%([\s\S]+?)%\}/g,   // excute code: {% code_to_execute %}
	escape      : /\{%-([\s\S]+?)%\}/g
};

$.ajax({
	url: 'faq.json.txt',
	dataType: 'json',
	success : function(data){
		$('.container').html(_.template(tabs, {FaqModel : data}));
		app();
	}
});

function app(){
	$('.tabs').tabs('.tabs-content');

	var navigating = false,
		curTabName = $('.tabs > .active').data('tab');

	$.resetActive = function($el){
		$el
			.stop(true, true)
			.removeClass('active')
			.css({
				'top': '',
				'left': '',
				'bottom': ''
			})
			.find('.faq-a')
			.css('display', 'none');

		$('.faq-q').removeClass('no-vertical');
		
		return $el;
	};

	(function setupTabs(){
		$('.tabs-content > div[data-tab]').each(function(){
			$(this).data('height', $(this).height());
		});
	}());

	$('.tabs').on('click', 'a', function(){
		var $curTab = $('.tabs-content > div').filter('[data-tab=' + curTabName + ']');

		$curTab
			.height($curTab.data('height'))
			.find('.faq-block')
			.each(function(){
				$.resetActive($(this)).show();
			});

		curTabName = $('.tabs > .active').data('tab');
	});

	$('.faq-col').on('click', '.faq-q', function(e){
		e.preventDefault();

		var $this = $(this),
			$block = $this.closest('.faq-block');

		if($block.hasClass('active') || navigating === true) return false;

		var	$ans = $this.siblings('.faq-a'),
			$blocks = $('.faq-block');
			$blockWrapper = $block.parent(),
			$active = $('.faq-block.active'),
			$tab = $('.tabs-content > .active'),
			offX = $block.position().left,
			offY = $block.position().top;

		navigating = true;

		if($active.length > 0){
			$active.fadeOut(400, function(){
				$.resetActive($active).fadeIn();

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

				$block.animate({
					'top' : 0
				}, 400);
			}
			else if(blockHeight + blockOffset > tabOffset + tabHeight){
				$block.animate({
					'top' : '-=' + ((blockOffset + blockHeight) - (tabOffset + tabHeight) + 10)
				}, 400);
			}
			navigating = false;
		}
	});
}

}