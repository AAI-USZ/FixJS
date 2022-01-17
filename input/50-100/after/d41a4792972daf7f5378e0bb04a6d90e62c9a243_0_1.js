function updateButtonLabel(id,newvalue){
		if(slider.getValue() != 0 && newvalue != -1){
			var finalvalue = "show "+slider.getValue()+mindate + newvalue;
			document.getElementById(id).value=finalvalue;
		}else{
			document.getElementById(id).value="N/A";
		}	
	}