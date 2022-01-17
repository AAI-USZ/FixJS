function ()
		{
			if (r.constant.MY_BROWSER === 'msie')
			{
				var output = document.selection.createRange().text;
			}
			else
			{
				var output = window.getSelection().toString();
			}
			return output;
		}