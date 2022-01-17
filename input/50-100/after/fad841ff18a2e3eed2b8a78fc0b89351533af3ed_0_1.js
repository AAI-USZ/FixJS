function updateButtonLabel(id,newvalue){
		if(slider.getValue() == 0 && newvalue == -1){
			document.getElementById(id).value="N/A";
		}else{
			var newcalcDate = slider.getValue() + mindate + newvalue;
			var finalvalue = "show "+newcalcDate;
			document.getElementById(id).value=finalvalue;
		}	
	}