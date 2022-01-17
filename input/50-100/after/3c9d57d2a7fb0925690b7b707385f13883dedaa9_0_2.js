function (event)
		{
			if (event.which === 13)
			{
				var output = '<br />';

				if (r.constant.MY_BROWSER === 'firefox')
				{
					output += '<div></div>';
				}
				else if (r.constant.MY_BROWSER === 'msie')
				{
					output += '<span></span>';
				}
				else if (r.constant.MY_ENGINE === 'webkit')
				{
					output += '<br />';
				}
				editor.insertHTML(output);
				event.preventDefault();
			}
		}