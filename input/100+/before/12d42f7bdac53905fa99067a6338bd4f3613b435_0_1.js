function (theForm, fromSectionClick, showDlg) {
// console.info ("ControlForms.send: sending is "+this.sending)
	if (this.sending == true)
		return;
		
	this.sending = true
	
	if (this.chkMandatory() == false) {
		alert ("There are items (red higlighted) which have to be answered");
		return false;
	}
	
	if (this.numbersOk == true) {
		var xReq = new AjaxReq();
		xReq.setMethod("POST");
		
		xReq.setUrl("ajaxjsp/saveintro.jsp");
		
		if (theForm.name.toUpperCase() == "INTROFORM") {
			xReq.setUrl("ajaxjsp/saveintro.jsp");
		}
		else if (theForm.name.toUpperCase() == "SECTIONFORM") {
				//      outForm (theForm);
			xReq.setUrl("ajaxjsp/saveform.jsp");
		}
			
		else // default
			xReq.setUrl("ajaxjsp/saveform.jsp");
		
		
		xReq.setForm(theForm);
		xReq.setCallback(this.ajaxResp.onSaveForm, this.ajaxResp.onFail, this.ajaxResp, null);
		if (showDlg) {
			var msgDlg = ""
			msgDlg = fromSectionClick? "Confirm these data before going to clicked section?":
																"Are you sure to confirm these data?"
/*																
			if (fromSectionClick)
				msgDlg = "Confirm these data before going to clicked section?";
			else
				msgDlg = "Are you sure to confirm these data?"
*/						

			if (confirm (msgDlg)) {
				xReq.startReq();
				return true;
			}
			else
				return false;
		} // EO if showDlg
		else
			xReq.startReq()
		
		
// This is to be aware when the interview is paused or finished in order to be
// able to change the group
		if (this.pauseIntrv == 1) {
			var spanTag = $('#grpSpan');
//			$('#grpSpan').add("a").attr("href", "setprimarygrp.jsp?typegroup=SEC").add('id', 'linkGrp');
			var spanLnk = '<a href="setsecondarygrp.jsp?typegroup=SEC" id="linkGrp">'+
										$(spanTag).html()+'</a>';
			$(spanTag).html(spanLnk);
		}
		
		return false;
	}
}