function(response,homeVW)
		{

			try
			{
	

						if(response.GenerateAPITokenJsonResult.ResponseMessageHeader.IsSuccess)
						{
							isAuthenticated = true;
							var token       = response.GenerateAPITokenJsonResult.ResponseMessageBody.MessageBody[0].Message;
							mpToken         = token;
							console.log('received token:'+mpToken);
				
			       homeVW.changeView(profileName+'.MainVW');
						}
						else{
							isAuthenticated = false;
							alert('login failed');
						}
			}
			catch(e)
			{
				alert(e);
			}

			
		}