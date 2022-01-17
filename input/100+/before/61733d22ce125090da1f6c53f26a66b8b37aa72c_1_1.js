function(obj) {
		var output = "";
		for (var prop in obj) {
			var classStr = (obj[prop].length || obj[prop] > 0) ? 'hasValue' : '';
			console.log(obj[prop].length);
			output += '<div class="' + classStr + '">';
			output += '<strong>' + prop + ':</strong> ' + obj[prop];
			output += '</div>';
		}
		$("<div>").attr("data-cnt",cnt++).html(output).prependTo("#output");
	}