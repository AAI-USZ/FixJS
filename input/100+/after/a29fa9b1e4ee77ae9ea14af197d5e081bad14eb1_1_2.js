function(){
			url=this.contentWindow.location.href
			ctestui.newURL(url)
			ctest.urlHistory.push(url)
			ctest.pageLoaded=true

			// Overwrite default bhaviour of some browser parts
			//ctestui.log('alert status: '+ctest.lastAlert+' / '+ctest.nextAlert)
			if (ctest.lastAlert && ctest.nextAlert==undefined){
				ctestui.log(printStackTrace().join('\n'))
				ctest.stopExecuting('There was an unmanaged alert: '+ctest.lastAlert)
			}

			// 2010 09 22 -- all ctest instances were parent.ctest. Dont know exactly why.
			this.contentWindow.alert=function(txt){
				ctestui.log('alert: '+txt); 
				if (ctest.lastAlert){
					ctestui.log(printStackTrace().join('\n'))
					stopExecuting('There was an unmanaged alert, and appeared a new one: '+ctest.lastAlert)
				}
				ctest.lastAlert=txt; 
			}
			if (ctest.lastPrompt && ctest.nextPrompt==undefined)
				ctest.stopExecuting('There was an unmanaged prompt: '+ctest.lastPrompt)
			this.contentWindow.prompt=function(txt){ 
				ctestui.log('prompt: '+txt); 
				if (ctest.lastPrompt){
					ctestui.log(printStackTrace().join('\n'))
					stopExecuting('There was an unmanaged prompt, and appeared a new one: '+ctest.lastPrompt)
				}
				ctest.lastPrompt=txt; 
				return ctest.nextPrompt;
			}
			if (ctest.lastConfirm && ctest.nextConfirm==undefined){
				ctestui.log(printStackTrace().join('\n'))
				ctest.stopExecuting('There was an unmanaged confirmation: '+ctest.lastconfirm)
			}
			this.contentWindow.confirm=function(txt){ 
				if (ctest.nextConfirm==undefined){
					ctestui.log(printStackTrace().join('\n'))
					stopExecuting('There was an unmanaged confirmation, and appeared a new one: '+ctest.lastconfirm)
				}
				ctestui.log('confirm: '+txt); 
				ctestui.log('confirm answer: '+ctest.nextConfirm); 
				if (ctest.lastConfirm){
					ctestui.log(printStackTrace().join('\n'))
					stopExecuting('There was an unmanaged confirmation, and appeared a new one: '+ctest.lastconfirm)
				}
				ctest.lastConfirm=txt; 
				return ctest.nextConfirm;
			}
			if ($('#seamless:checked').length){
				activateSeamless()
			}
		}