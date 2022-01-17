function(txt){
				ctestui.log('alert: '+txt); 
				//ctestui.log(printStackTrace().join('\n'))
				if (ctest.lastAlert)
					stopExecuting('There was an unmanaged alert, and appeared a new one: '+ctest.lastAlert)
				ctest.lastAlert=txt; 
			}