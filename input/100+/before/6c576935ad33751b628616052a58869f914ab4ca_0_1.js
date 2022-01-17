function(){
		formReady = true;
				
		var oldCustomValidity = $.fn.setCustomValidity || function(message){
			return this.each(function(){
				if(this.setCustomValidity){
					this.setCustomValidity(message);
				}
			});
		};
		
		
		$.fn.setCustomValidity = function(message){
			if(!blockCustom){
				this.data('customMismatchedRule', '');
			}
			return oldCustomValidity.apply(this, arguments);
		};
		
		
		//if constraint validation is supported, we have to change validityState as soon as possible
		if(document.addEventListener && document.createElement('form').checkValidity){
			document.addEventListener('change', onEventTest, true);
		}
		
		webshims.addReady(function(context, selfElement){
			initTest = true;
			$('input, select, textarea', context).add(selfElement.filter('input, select, textarea')).each(function(){
				testValidityRules(this);
			});
			initTest = false;
		});
		$(document).bind('refreshCustomValidityRules', onEventTest);
		
	}