function(){
				var tag = $(this).val(),
				string = textStyle.paragraph(tag, $span);
				if(string) $span.html(string);
			}