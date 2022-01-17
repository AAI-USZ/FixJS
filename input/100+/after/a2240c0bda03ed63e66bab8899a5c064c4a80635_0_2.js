function run()
	{
		
		function success(resp)
		{
			console.log("success with:" + resp.msg);
		}
		
		function fail(err)
		{
			console.log("failed with: " + err.msg);
		}
		
		var lib = window.plugins.adConnectLibrary;
		console.log("Testing the plugin");
		
		var config = {
				id: "12345",
				size: lib.AdSize.BANNER,
				layout: {
					gravity: "bottom"
				},
				defaultIsProduction: true
		}
		
		lib.create(config, 
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
					lib.loadAd(adRequest, function(resp){
						
						if(resp.msg)
						{
							console.log(resp.msg);
						}
						
						else
						{
							console.log(resp);
						}
						
						setTimeout(function(){
							
							lib.hide(function(resp)
									{
										if(resp.msg)
										{
											console.log(resp.msg);
										}
										
										else
										{
											console.log(resp);
										}
										
										setTimeout(function(){
											
											lib.show(success, fail);
										}, 15000)
										
									}, fail);
						}, 15000);
						
					}, fail);
				
				}, fail);
	}