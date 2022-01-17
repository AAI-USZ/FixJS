function(txt){ 
				ctestui.log('prompt: '+txt); 
				if (ctest.lastPrompt){
					ctestui.log(printStackTrace().join('\n'))
					stopExecuting('There was an unmanaged prompt, and appeared a new one: '+ctest.lastPrompt)
				}
				ctest.lastPrompt=txt; 
				return ctest.nextPrompt;
			}