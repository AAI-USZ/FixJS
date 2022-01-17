function  ()
{
	if (typeof (webForm.Page_ValidationSummaries) != 'undefined' && webForm.Page_ValidationSummaries != null) {
		webForm.have_validation_summaries = true;
	}

	if (typeof (webForm.Page_Validators) != 'undefined' || webForm.Page_Validators != null) {
		for (var v = 0; v < webForm.Page_Validators.length; v++) {
			var vo = webForm.Page_Validators [v];

			if (typeof(vo.isvalid) == "string" && vo.isvalid == "False")
				vo._isvalid = false;
			else
				vo._isvalid = true;

			if (typeof(vo.enabled) == "string" && vo.enabled == "False")
				vo._enabled = false;
			else
				vo._enabled = true;
			
			if (typeof(vo.evaluationfunction) == "string")
				vo.evaluationfunction = webForm [vo.evaluationfunction];
		}
	}
	
	webForm.Page_ValidationActive = true;
}