function traversing_exercise(){
		$('img[alt]').each(function(){
			console.log(this.alt);
		});

		console.log($('input[name="q"]').parent().addClass('myclass'));

		console.log($('#myList[class="current"]').removeClass());

		console.log($('#myList li[class*="current"]').removeClass().next().addClass('current'));

		$('#specials select').parentsUntil('form').each(function(){
			console.log($(this).find('input[type="submit"]'));
		});

		$('#slideshow li:first').addClass('current').siblings().addClass('disabled');		
	}