function(element, content) {
				if ($(element[0]).hasClass('php'))
					return '[php]' + content + '[/php]';

				var from = '';
				if ($(element).children("cite:first").length === 1)
				{
					from = $(element).children("cite:first").text();

					$(element).attr({'from': from.php_htmlspecialchars()});

					from = '=' + from;
					content = '';
					$(element).children("cite:first").remove();
					content = this.elementToBbcode($(element));
				}
				else
				{
					if ($(element).attr('from') != undefined)
					{
						alert($(element).attr('from'));
						alert($(element).attr('from').php_unhtmlspecialchars());
						from = '=' + $(element).attr('from').php_unhtmlspecialchars();
					}
				}

				return '[code' + from + ']' + content + '[/code]';
			}