function (method){
	var context=$(this),
		data, call, args, givenArgs, i, opts;
	if(typeof(method) === 'object' || !method) {
		givenArgs=arguments;
		call="_init";
	}
	else if($.gS[method]) {
		givenArgs=Array.prototype.slice.call(arguments,1);
		call=method;
	}
	else throw "Error: The method \""+method+"\" doesn't exist in greenishSlides";
	
	for(i=0; i<context.length; i++) {
		args=givenArgs;
		data=$(context[i]).data("greenishSlidesData") || $(context[i]).parent().data("greenishSlidesData");
		if(data && call=="_init") {
			$.gS._init(data, method=="_init"?Array.prototype.slice.call(arguments,1):method, true);
			continue;
		}
		data = data || {
				context : $(context[i]),
				css:{},
				dcss:{},
				limits:{},
				callbacks:[],
				slides:[],
				ai:-1,
				active:$()
			};
		if(call=="_init") {
			opts = $.gS._extendOpts(data, method=="_init"?Array.prototype.slice.call(arguments,1):method);
			args=[data, opts];
		}
		else args=[data].concat(args);
		$(context[i]).data("greenishSlidesData",data);

//		Call method and catch "callbackReturnedFalse" error from Callback. 
		if(call=="_triggerCallback") return $.gS[call].apply(context[i], args);
		else try { 
				$.gS[call].apply(context[i], args);
			}
			catch(err){
				if(err!="callbackReturnedFalse") throw err;
			}
	}
	return this;
}