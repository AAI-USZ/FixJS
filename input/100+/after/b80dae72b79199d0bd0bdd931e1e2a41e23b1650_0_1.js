function updateButtonLabel(id,newvalue){
		if(slider.getValue() == 0 && newvalue == -1){
			document.getElementById(id).value="N/A";
		}else if(slider.getValue() == (maxdate-mindate) && newvalue == +1){
			document.getElementById(id).value="N/A";
		}else{
			var newcalcDate = parseInt(slider.getValue()) + parseInt(mindate) + parseInt(newvalue);
			var finalvalue = "show "+newcalcDate;
			document.getElementById(id).value=finalvalue;
		}	
	}