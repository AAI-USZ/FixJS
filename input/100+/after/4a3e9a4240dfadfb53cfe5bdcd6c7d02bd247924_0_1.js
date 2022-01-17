function(element, content) {
				var author = '';
				var date = '';
				var link = '';

				if ($(element).children("cite:first").length === 1)
				{
					author = $(element).children("cite:first").find("author").text();
					date = $(element).children("cite:first").find("date").attr('timestamp');
					link = $(element).children("cite:first").find("quote_link").text();

					$(element).attr({'author': author.php_htmlspecialchars(), 'date': date, 'link': link});
					if (author != '')
						author = ' author=' + author;
					if (date != '')
						date = ' date=' + date;
					if (link != '')
						link = ' link=' + link;

					content = '';
					$(element).children("cite:first").remove();
					content = this.elementToBbcode($(element));
				}
				else
				{
					if ($(element).attr('author') != undefined);
						author = ' author=' + $(element).attr('author').php_unhtmlspecialchars();
					if ($(element).attr('date') != undefined);
						date = ' date=' + $(element).attr('date');
					if ($(element).attr('link') != undefined);
						link = ' link=' + $(element).attr('link');
				}

				return '[quote' + author + date + link + ']' + content + '[/quote]';
			}