function(path, request){
		
		var method = request.getMethod();
		var parameters = request.getParameterMap().keySet();
		if(method == 'GET'){
			if(path.match(this.flyoutUrlRegex)){
				//it is a preview request
				if(path.indexOf('/type/')!=-1){
					return 'flyout-type';
				}
				if(path.indexOf('/property/')!=-1){
					return 'flyout-property';
				}
				if(path.indexOf('/entity/')!=-1){
					return 'flyout-entity';
				}
				return 'unknown';
			}
			if(path.match(this.suggestUrlRegex)){
				//it is a suggest request
				return 'suggest-' + path.substring(path.lastIndexOf('/')+1);
			}
			if(path.match(this.viewUrlRegex)){
				//it is a view resource request
				return 'view-resource';
			}
			if(path.match(this.templatePreviewUrlRegex)){
				return 'preview-resource-template';
			}
			if(path.match(this.previewUrlRegex)){
				//it is a preview resource request
				return 'preview-resource';
			}
			//metadata request is a GET request that has only 'callback' parameter
			if(parameters.equals(Packages.java.util.Collections.singleton('callback'))){
				return 'metadata';
			}
		}else if(method == 'POST'){
			//multi reconcile request is a POST request that has 'queries' parameter (not necessarily alone)
			if(parameters.contains('queries')){
				return 'multi-reconcile';
			}
		}
		return 'unknown';
	}