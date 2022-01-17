function() {
			var l = window.lang;
			$("#play div").html(l.header["field 1"]);
			$("#tutorial div").html(l.header["field 2"]);
			$("#about div").html(l.header["field 3"]);
			$("#credits div").html(l.header["field 4"]);
			$("input#username").attr("placeholder",l.body.play.gameselect.login["field 7"]);
			$("input#password").attr("placeholder",l.body.play.gameselect.login["field 8"]);
			$("button.login-btn").html(l.body.play.gameselect.login["field 2"]);
		}