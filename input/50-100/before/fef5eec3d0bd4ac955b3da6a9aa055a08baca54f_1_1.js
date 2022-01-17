function (data, status)
			{
				if(typeof(data.error) != 'undefined')
				{
					if(data.error != '')
					{
						alert(data.msg);
						$('#msg').html(data.msg);
					}else
					{
						$('#msg').html(data.msg);
					}
				}
			}