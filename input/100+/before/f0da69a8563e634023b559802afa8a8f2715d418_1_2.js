function(formValues) {
		var formValuesMap = new Object();
		for ( var i = 0; i < formValues.length; i++) {
			var formValue = formValues[i];
			if (formValue.value && jQuery.trim(formValue.value).length > 0)
				formValuesMap[formValue.name] = formValue.value;
		}

		var postParam = "";
		this.parameters.each(function(param) {
			var paramValue = jQuery.trim(formValuesMap[param.name]);
			if (param.paramType == "body" && paramValue.length > 0) {
				postParam = postParam.length > 0 ? postParam : "{";
				postParam += "\"" + param.name + "\"";
				postParam += ":";
				postParam += "\"" + formValuesMap[param.name] + "\",";
			}
		});

		if (postParam.length > 0) {
			postParam = postParam.substring(0, postParam.length - 1) + "}";
		}

		return postParam;
	}