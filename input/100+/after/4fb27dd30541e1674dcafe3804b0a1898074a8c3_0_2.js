function(){
	function selecting_exercise(){
		console.log($('div .module'));

		console.log($('#myList li:nth-child(3)'));
		console.log($('#myList li:eq(2)'));
		console.log($('#myList li')[2]);
		
		console.log($('label[for="q"]'));
		
		console.log($('*:hidden'));
		
		console.log($('img[alt]'));

		console.log($('#myList li:nth-child(odd)'));

		console.log($('tbody tr:nth-child(odd)'));		
	}

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
	
	function manipulating_exercise(){
		$('#myList').append("<li>First</li><li>Second</li><li>Third</li><li>Fourth</li><li>Fifth</li>");

		$('#myList li:nth-child(odd)').remove();		

		$('div.module:last').append('<h2></h2><p></p>');

		$('body').find('select').append('<option>Monday</option>');

		$('div.module').parent().append('<div class"module"></div>').find('div.module:last').append($('img')[0]);		
	}
	
	traversing_exercise();
}