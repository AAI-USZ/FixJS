function(){
		$.isDOMReady = $.isReady;
		if(!$.isDOMReady){
			var $Ready = $.ready;
			$.ready = function(unwait){
				if(unwait !== true && !$.isDOMReady){
					if(document.body){
						$.isDOMReady = true;
						isReady('DOM', true);
						$.ready = $Ready;
					} else {
						setTimeout(function(){
							$.ready(unwait);
						}, 13);
					}
				}
				return $Ready.apply(this, arguments);
			};
		} else {
			isReady('DOM', true);
		}
		$(function(){
			$.isDOMReady = true;
			isReady('DOM', true);
			setTimeout(function(){
				isReady('WINDOWLOAD', true);
			}, 9999);
		});
		$(window).load(function(){
			isReady('DOM', true);
			isReady('WINDOWLOAD', true);
		});
	}