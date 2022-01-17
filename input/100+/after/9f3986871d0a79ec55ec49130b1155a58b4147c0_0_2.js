function ValidatorEnable(val, enable) {	
	if (enable == false) {
		SetValidatorEnabledState (val, false);
		window.ValidatorSucceeded (val);
		return;
	}
	
	SetValidatorEnabledState (val, true);
	
	if (typeof(val.evaluationfunction) != "function") {
		return;
	}
	
	var isvalid = val.evaluationfunction.call (this, val);
	val._isvalid = isvalid;
	
	if (!isvalid) {
		window.validation_result = false;
	}
}