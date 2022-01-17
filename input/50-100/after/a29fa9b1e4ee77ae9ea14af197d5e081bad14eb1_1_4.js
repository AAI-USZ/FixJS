function(txt){
				ctestui.log('alert: '+txt); 
				if (ctest.lastAlert){
					ctestui.log(printStackTrace().join('\n'))
					stopExecuting('There was an unmanaged alert, and appeared a new one: '+ctest.lastAlert)
				}
				ctest.lastAlert=txt; 
			}