function setOutlineProviders(fileContentType, title) {
		var outlineProviders = serviceRegistry.getServiceReferences("orion.edit.outliner"), //$NON-NLS-0$
		    filteredProviders = [];
		for (var i=0; i < outlineProviders.length; i++) {
			var serviceReference = outlineProviders[i],
			    contentTypeIds = serviceReference.getProperty("contentType"), //$NON-NLS-0$
			    pattern = serviceReference.getProperty("pattern"); // for backwards compatibility //$NON-NLS-0$
			var isSupported = false;
			if (contentTypeIds) {
				isSupported = contentTypeIds.some(function(contentTypeId) {
						return contentTypeService.isExtensionOf(fileContentType, contentTypeId);
					});
			} else if (pattern && new RegExp(pattern).test(title)) {
				isSupported = true;
			}
			if (isSupported) {
				filteredProviders.push(serviceReference);
			}
		}
		var deferreds = [];
		for(var i=0; i<filteredProviders.length; i++){
			if(filteredProviders[i].getProperty("nameKey") && filteredProviders[i].getProperty("nls")){
				var deferred = new dojo.Deferred();
				deferreds.push(deferred);
				i18nUtil.getMessageBundle(filteredProviders[i].getProperty("nls")).then(dojo.hitch(this, function(i, deferred, commandMessages){
					filteredProviders[i].displayName = commandMessages[filteredProviders[i].getProperty("nameKey")];
					deferred.resolve();
				}, i, deferred), dojo.hitch(this, function(i, deferred, error){
					deferred.reject(error);
				}, i, deferred));
			} else {
				filteredProviders[i].displayName = filteredProviders[i].getProperty("name");
			}
		}
		if(deferreds.lenth==0){
			outlineService.setOutlineProviders(filteredProviders);
			outliner.setOutlineProviders(filteredProviders);
		}else{
			new dojo.DeferredList(deferreds).addBoth(dojo.hitch(this, function(){
				outlineService.setOutlineProviders(filteredProviders);
				outliner.setOutlineProviders(filteredProviders);
			}));
		}
	}