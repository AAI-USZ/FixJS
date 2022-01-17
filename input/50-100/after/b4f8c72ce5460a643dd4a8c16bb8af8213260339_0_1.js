function(){

	$.ajax({
		url : 'products.json.txt',
		dataType : 'json',
		success : function(data){
			$('.main').thiralLazyLoad({
				'nav' : $('.nav'),
				'data' : data
			});
		}
	});
	
}