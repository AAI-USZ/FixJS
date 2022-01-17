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
		outlineService.setOutlineProviders(filteredProviders);
		outliner.setOutlineProviders(filteredProviders);
	}