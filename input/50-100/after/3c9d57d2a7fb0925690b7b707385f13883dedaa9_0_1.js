function ()
		{
			var output = '';

			if (r.constant.MY_BROWSER === 'msie')
			{
				output = document.selection.createRange().text;
			}
			else
			{
				output = window.getSelection().toString();
			}
			return output;
		}