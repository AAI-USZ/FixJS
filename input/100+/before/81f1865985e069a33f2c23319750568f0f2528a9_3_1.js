function(that, span) {
			var s = window.getSelection()
				, newstring = ''
				, find = s.toString();

			if(!$('input', that).length)
				$('<input type="text">').appendTo(that)
					.on('keyup', function(e){
					var code = (e.keyCode ? e.keyCode : e.which);
					if(code == 13) {
						
						newstring += '<a href="http://'+$(this).val()+'">';
						newstring += find;
						newstring += '</a>';
						
						var string = span.html().replace(find, newstring);

						$(this).remove();
						span.html(string);
					}
				}).focus();
		}