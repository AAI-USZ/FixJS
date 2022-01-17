function() {

		var data = this.value.split("|");
		var textInput = 'input type="hidden" name="' + data[0] + '" value=\'' + data[1] + data[2] + '\' /';

		if ($(this).attr('checked')) {

			$("#search-refinements").append('&lt;' + textInput + '&gt;<br/>');

		} else { // Unchecked

			var value = $("#search-refinements").text();
			value = value.replace('<' + textInput + '>', "");
			value = value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
			value = value.replace(/&gt;/g,"&gt;<br />");
			$("#search-refinements").html(value);
            
		}
	}