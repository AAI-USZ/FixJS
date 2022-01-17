function(formValues) {
		var formValuesMap = new Object();
		for ( var i = 0; i < formValues.length; i++) {
			var formValue = formValues[i];
			if (formValue.value && jQuery.trim(formValue.value).length > 0)
				formValuesMap[formValue.name] = formValue.value;
		}
		
		var postParam = "";
		var version = this.version;
		for(var name in formValuesMap){
			
			var value = jQuery.trim(formValuesMap[name]);
			var valArr = new Array();
			valArr[0] = value;
			var dataType = this.params_table.find('input[name=' + name + "]").parents("tr").find(".type").html(); 
			if(dataType == "String[]"){
				valArr = value.split(",");
				
			}
			if(version == "v1" && dataType == "String[]"){
				var listFormatParam = "\"" + name + "\":[";
				for(var i in valArr){
					
					var paramValue = jQuery.trim(valArr[i]);
					if(paramValue.length > 0){
						listFormatParam += "\"" + paramValue + "\",";
					}
				}
				listFormatParam = listFormatParam.substring(0, listFormatParam.length-1) + "],";
				postParam += listFormatParam;
			}else{
				for(var i  in valArr){
					var paramValue = jQuery.trim(valArr[i]);
					if (paramValue.length > 0) {
						postParam = postParam.length > 0 ? postParam : "{";
						postParam += "\"" + name + "\"";
						postParam += ":";
						postParam += "\"" + paramValue + "\",";
					}
				}
			}
//			
			
		
			
		}


		if (postParam.length > 0) {
			postParam = postParam.substring(0, postParam.length - 1) + "}";
		}
		console.log(postParam);
		return postParam;
	}