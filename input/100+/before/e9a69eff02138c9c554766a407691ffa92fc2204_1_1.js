function() {
	$.tailor = {
		language : function() {
			var self = this;
			$.lang.init(function() {
				self.header();					
				device.start();
			});	
		},
		header:  function() {
			var l = window.lang;
			$("#play div").html(l.header["field 1"]);
			$("#tutorial div").html(l.header["field 2"]);
			$("#about div").html(l.header["field 3"]);
			$("#credits div").html(l.header["field 4"]);
			$("#login-tag").html(l.body.play.gameselect.login["field 2"]);
		},
	};

	$(document).ready(function() {
		$.tailor.language();		
	});
}