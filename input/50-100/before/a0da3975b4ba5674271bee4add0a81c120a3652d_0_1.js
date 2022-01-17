function manipulating_exercise(){
		$('#myList').append("<li>First</li><li>Second</li><li>Third</li><li>Fourth</li><li>Fifth</li>");

		$('#myList li:nth-child(odd)').remove();		

		$('div.module:last').append('<h2></h2><p></p>');

		$('body').find('select').append('<option>Monday</option>');

		$('div.module').parent().append('<div class"module"></div>').find('div.module:last').append($('img')[0]);		
	}