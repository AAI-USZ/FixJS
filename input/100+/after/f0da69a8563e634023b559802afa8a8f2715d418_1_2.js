f		var formValuesMap = new Object();
		for ( var i = 0; i < formValues.length; i++) {
			var formValue = formValues[i];
			if (formValue.value && jQuery.trim(formValue.value).length > 0)
				formValuesMap[formValue.name] = formValue.value;
		}

		var postParam = "";
		this.params_table.find("tbody tr").each(function(){
			var name = $(this).find(".code").html();
			var paramValue = jQuery.trim(formValuesMap[name]);
			if (paramValue.length > 0) {
				postParam = postParam.length > 0 ? postParam : "{";
				postParam += "\"" + name + "\"";
				postParam += ":";
				postParam += "\"" + formValuesMap[name] + "\",";
			}
		});
//		this.parameters.each(function(param) {
//			var paramValue = jQuery.trim(formValuesMap[param.name]);
//			if (param.paramType == "body" && paramValue.length > 0) {
//				postParam = postParam.length > 0 ? postParam : "{";
//				postParam += "\"" + param.name + "\"";
//				postParam += ":";
//				postParam += "\"" + formValuesMap[param.name] + "\",";
//			}
//		});

		if (postParam.length > 0) {
			postParam = postParam.substring(0, postParam.length - 1) + "}";
		}

		return postParam;
	}
