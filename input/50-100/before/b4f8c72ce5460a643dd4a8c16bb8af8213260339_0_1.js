function(){

	$.ajax({
		url : 'products',
		dataType : 'json',
		success : function(data){
			$('.main').thiralLazyLoad({
				'nav' : $('.nav'),
				'data' : data
			});
		}
	});
	
}