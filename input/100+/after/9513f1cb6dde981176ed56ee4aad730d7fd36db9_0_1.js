function(ar, fn, opts){
		opts = $.extend({}, $.lazyEach.defaults, opts);
		fn.iterateStep = 0;
		var timer,
			goAhead = true,
			abort 	= function(){
				goAhead = false;
				clearTimeout(timer);
				opts.abort(ar, fn.iterateStep);
			}
		;
		if(ar && ar.length){
			function step(){
				if(goAhead){
					var stepEnd = fn.iterateStep + opts.partSize,
						stepArray = (ar.slice) ? 
						ar.slice(fn.iterateStep, stepEnd) : 
						Array.prototype.slice.call(ar, fn.iterateStep, stepEnd);
					$.each(stepArray, fn);
					if(ar.length <= stepEnd) {
						opts.complete(ar);
					} else {
						fn.iterateStep = fn.iterateStep + opts.partSize;
						timer = setTimeout(step, opts.breathTime);
					}
				}
				
			}
			step();
			return abort;
		}
		
    //$.each.apply(this, arguments); // LE SIGH - breaks on iOS
    $.each(ar, function(n, value){
      fn.call(this, value);
    });

		opts.complete(ar);
		return abort;
	}