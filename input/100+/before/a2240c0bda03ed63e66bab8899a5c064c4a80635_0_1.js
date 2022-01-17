function(resp)
				{
					if(resp.msg)
					{	
						console.log(resp.msg);
					}
					
					else
					{
						console.log(resp);
					}
					
					console.log("building adRequest");
					var adRequest = 
					{
						isInTestMode: true,
						bday: lib.BDay(1988, 9, 28),
						gender: lib.Gender.MALE,
						lang: lib.Language.ENGLISH
					};
					
					console.log("Loading ad using adRequest");
					lib.loadAd(adRequest, success, fail);
				
				}