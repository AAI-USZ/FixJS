function (event)
		{
			if (event.which === 13)
			{
				var output = '<br />';
				if (r.constant.MY_BROWSER === 'firefox')
				{
					output += '<div></div>';
				}
				if (r.constant.MY_BROWSER === 'msie')
				{
					houtputtml += '<span></span>';
				}
				if (r.constant.MY_ENGINE === 'webkit')
				{
					output += '<br />';
				}

				editor.insertHTML(output);
				event.preventDefault();
			}
		}