function onLoadEnumTypes(o) {
    overlay.hide();
		try {
			// Zero, deactivate control feedback
			if(onChangeHandler!=undefined) {
				try {
					selectTypes.removeEventListener('change',onChangeHandler,false);
				} catch(e) {
					// DoNothing(R)
				}
			}
      
// First, empty controls
			var emptySelect=function(selectCtrl) {
				for(var ri=selectCtrl.length-1;ri>=0;ri--) {
					selectCtrl.remove(ri);
				}				
			};
			emptySelect(selectTypes);
			selectTypes.selectedIndex=-1;
			
// inner function to fill the select with the option      
			var fillSelect = function(myList, tName, id) {
				var thedoc=myList.ownerDocument;
				var newOpt=thedoc.createElement('option');
				newOpt.text=tName;
				newOpt.value=id;
				myList.appendChild(newOpt);
			};
			
// Second, populate controls!
      if (intrvClonned == false)
        fillSelect(selectTypes,'---NEW---','-1');
      else
        fillSelect (selectTypes, '-- TRANSLATE --', '-1');
        
			var resp = YAHOO.lang.JSON.parse(o.responseText);
			var listlength = resp.length;
			for (var typei=0; typei<listlength; typei++) {
				var id=resp[typei].id;
				var tName=resp[typei].name;
				fillSelect(selectTypes,tName,id);
			}
			
			 // Third, reattach change events
			 if(onChangeHandler!=null)
			 	selectTypes.addEventListener('change',onChangeHandler,false);
		} catch (exp) {
			alert("JSON Parse failed!"+o.responseText); 
	    	return;
		}
	}