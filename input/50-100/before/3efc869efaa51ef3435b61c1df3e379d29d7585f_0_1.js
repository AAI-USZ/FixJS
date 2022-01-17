function( attrs )
		{
			var flag = false;
			_.each(attrs.layers, function(layerID){ if( !_.isNumber(layerID) ) flag = true });
			if(flag)
			{
				alert('There was an error with your project :(/nplease email bugs@zeega.org and describe what you were doing that led to this error.\nPlease refresh your browser. Your last edit may not have saved. We apologize for the inconvenience.');
				return 'layer array update error!';
			}
		}