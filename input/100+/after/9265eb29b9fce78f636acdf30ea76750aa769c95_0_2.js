f		var formValuesMap = new Object();
		for ( var i = 0; i < formValues.length; i++) {
			var formValue = formValues[i];
			if (formValue.value && jQuery.trim(formValue.value).length > 0)
				formValuesMap[formValue.name] = formValue.value;
		}

		var urlTemplateText = this.path.split("{").join("${");
		var urlTemplate = $.template(null, urlTemplateText);
		var url = $.tmpl(urlTemplate, formValuesMap)[0].data;

		var queryParams = "";
		var apiKey = Main.token;
		if (apiKey) {
			apiKey = jQuery.trim(apiKey);
			if (apiKey.length > 0)
				queryParams = "?api_key=" + apiKey;
		}

		// var names = Object.keys(formValuesMap);
		if(method=="post"){
			url = Main.base_url + url + queryParams;
			return url;
		}
		for ( var name in formValuesMap) {
			var value = formValuesMap[name];
			var valArr = new Array();
			valArr[0] = value;
			if(this.params_table.find('input[name=' + name + "]").parents("tr").find(".type").html() == "String[]"){
				valArr = value.split(",");
			}
			
			for(var i in valArr){
				val = jQuery.trim(valArr[i]);
				if (val.length > 0) {
					queryParams += queryParams.length > 0 ? "&" : "?";
					
					queryParams += name;
					queryParams += "=";
					queryParams += val;
				}
			}
			
		}
		;

		url = Main.base_url + url + queryParams;
		return url;
	},
