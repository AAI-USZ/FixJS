function() {

	"use strict";

	$("#error0").on("click", function() {
		blah();
	});

	$("#error1").on("click", function() {
		try {
			blah();
		} catch(e) {
			appfail.reporting.catchManual(e);
		}
	});

	var cnt = 0;
	
	tempTestingFunction = function(obj) {
		var output = "";
		for (var prop in obj) {
			var classStr = (obj[prop].length || obj[prop] > 0) ? 'hasValue' : '';
			output += '<div class="' + classStr + '">';
			output += '<strong>' + prop + ':</strong> ' + obj[prop];
			output += '</div>';
		}
		$("<div>").attr("data-cnt",cnt++).html(output).prependTo("#output");
	};


}