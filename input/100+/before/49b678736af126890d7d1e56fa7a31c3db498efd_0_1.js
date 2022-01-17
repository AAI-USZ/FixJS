function() {
		
		if (obj.contentArray.length < obj.options.limit) {
			alert('Sorry but you have set a limit (' + obj.options.limit + ') but didn\'t return that many items in your RSS feed.');
			return false;
		}
		
		var ths = obj.contentArray.sort(obj.by(2,1));
		
		// console.log(printThis[0]);
		obj.html = '<ul>';
		
		for (i=0; i < obj.options.limit; i++) {
			obj.html += ths[i][0];
		}
		
		obj.html += '</ul>';
		$(obj.element).html(obj.html);
	}