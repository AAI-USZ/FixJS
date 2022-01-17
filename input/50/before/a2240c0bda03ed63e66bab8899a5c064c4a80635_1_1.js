function(msg, success, fail) 
			{
				return PhoneGap.exec(success,    //Success callback from the plugin
					      fail,     //Error callback from the plugin
					      'AdConnectLibrary',  //Tell PhoneGap to run "DirectoryListingPlugin" Plugin
					      'test',              //Tell plugin, which action we want to perform
					      [msg]);
			}