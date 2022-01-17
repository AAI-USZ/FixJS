function initVal(){
	if(localStorage.acti == VoluniAppPref.ACTI_ACTIVE)
		$('input:radio[name=acti]')[0].checked = true;
	else
		$('input:radio[name=acti]')[1].checked = true;
	 
	if(localStorage.hide == VoluniAppPref.HIDE_AUTO)
		$('input:radio[name=hide]')[0].checked = true;
	else
		$('input:radio[name=hide]')[1].checked = true;
	 
	if(localStorage.adap == VoluniAppPref.ADAP_ON){
		$("input:checkbox[name=adap][value=_a_]")[0].checked = true;
		$("input:checkbox[name=adap][value=_z_]")[0].checked = false;
	}
	else if(localStorage.adap == VoluniAppPref.ADAP_ZOOM){
		$("input:checkbox[name=adap][value=_a_]")[0].checked = false;
		$("input:checkbox[name=adap][value=_z_]")[0].checked = true;
	}
	else{
		$("input:checkbox[name=adap][value=_a_]")[0].checked = false;
		$("input:checkbox[name=adap][value=_z_]")[0].checked = false;
	}
	 
	if(localStorage.btt == VoluniAppPref.BTT_ON)	
		$("input:checkbox[name=btt]")[0].checked = true;
	else
		$("input:checkbox[name=btt]")[0].checked = false;
 }