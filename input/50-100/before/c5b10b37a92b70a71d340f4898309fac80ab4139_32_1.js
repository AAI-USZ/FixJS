function(indexingObj){
	
		apf.load(dataDir, schema, apState.internal, ol.getLatestVersionId(), function(aph){
		
			apState.setIndexing(indexingObj);
			apState.setAp(aph)
			cb(apState.external, indexingObj, broadcaster, aph.close.bind(aph))
		})
	}