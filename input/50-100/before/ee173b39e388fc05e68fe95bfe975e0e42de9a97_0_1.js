function (data, callback) {
	$(document).unbind('ajaxError');
	console.log('send');
	console.log(data);
	$.ajax({
		'url': riurik.reporter.url,
		'data': data,
		'dataType': 'jsonp',
		'complete': function(){
			$(document).bind('ajaxError', ajaxError);
			if(typeof callback != 'undefined') {
				callback(data);
			}	
		}
	});
}