function( attrs )
		{
			console.log('VALIDATE LAYER ARRAY',attrs.layers+'');
			
			if( attrs.layers.length > 1 && _.include(attrs.layers,false))
			{
				alert('There was an error with your project :(/nplease email bugs@zeega.org and describe what you were doing that led to this error.\nPlease refresh your browser. Your last edit may not have saved. We apologize for the inconvenience.');
				return 'layer array update error!';
			}
			
		}