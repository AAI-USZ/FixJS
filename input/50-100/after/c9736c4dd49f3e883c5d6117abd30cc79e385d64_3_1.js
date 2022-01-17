function(response,homeVW)
		{

			try
			{
						console.log(response);

						if(response.ResponseMessageHeader.IsSuccess)
						{
							isAuthenticated = true;
							var token       = response.ResponseMessageBody.MessageBody[0].Message;
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