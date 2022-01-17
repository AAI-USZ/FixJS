function() {
		var div = new $("div#test2")[0];
		$.data(div,"test",{ first : 16, last : "pizza!"});
		new $("span:first").text($.data(div,"test").first);
		new $("span:last").text($.data(div,"test").last);
		this.assertEquals("The values stored were 16 and pizza!",$.trim(new $(div).text()),{ fileName : "Test.hx", lineNumber : 19, className : "Test", methodName : "test2"});
		$.get("ajax/test.html",function(data) {
			new $(".result").html(data);
			js.Lib.alert("Load was performed.");
		});
	}