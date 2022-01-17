function(txt){ 
				ctestui.log('confirm: '+txt); 
				ctestui.log('confirm answer: '+ctest.nextConfirm); 
				if (ctest.lastConfirm)
					stopExecuting('There was an unmanaged confirmation, and appeared a new one: '+ctest.lastconfirm)
				ctest.lastConfirm=txt; 
				return ctest.nextConfirm;
			}