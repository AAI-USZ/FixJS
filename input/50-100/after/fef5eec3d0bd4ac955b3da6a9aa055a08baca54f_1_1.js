function (data, status)
			{
				if(typeof(data.error) != 'undefined')
				{
					if(data.error != '')
					{
						$('#msg').html(data.msg);
					}else
					{
						alert(data.msg);
						closeWindow('#importBuild');
						window.location.href=window.location.href;
					}
				}
			}