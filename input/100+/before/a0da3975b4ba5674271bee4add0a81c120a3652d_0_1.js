function traversing_exercise(){
		$('img').each(function(){
			console.log($(this).attr('alt'));
		});

		console.log($('input[name="q"]').parents('form').addClass('myclass'));

		console.log($('#myList[class="current"]').removeClass());

		console.log($('#myList li[class*="current"]').removeClass().next().addClass('current'));

		console.log($('#specials select').parents('form').find('input[type="submit"]'));

		$('#slideshow li:first').addClass('current').siblings().addClass('disabled');		
	}