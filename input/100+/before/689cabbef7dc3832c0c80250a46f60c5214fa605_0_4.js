function(props,a,b,c){
	var opts = $.speed( a,b,c ),
		//No-conflict form
		_this = this;
	//Shorcut for custom animations
	if( props.constructor == Function ){
		$({ p:0 }).animate({ p:1 },{
			step: props,
			duration: opts.duration,
			easing: opts.easing,
			complete: opts.complete
		});
		return this;
	};
	
	var nodecss = [];
	this.each(function( el ){
		var node = this, 
			prop = { };
		$.each(props,function( key,val ){
			//Makes the cross-browser
			if( key in specials )
				key = specials[key];

			//Store the origin value
			var oldvalue = "";
			//Tries find the @oldValue in @el.style propertie
			if ( node.style[key] )
				oldvalue = node.style[key];
			//If not tries find the @oldValue in computedStyle of el
			else if ( dTest.test( $(node).css(key) ) )
				oldvalue = $(node).css(key);
			//If it does not find in either the @oldValue takes value 0
			else oldvalue = "0";
			prop[ key ] = [ oldvalue,val ];
		});
		nodecss[ el ] = [ node,prop ];
	});
	console.log(nodecss)
	//Run the animation
	$( { p:0 } ).animate({ p:1 },{
		step: function( p ){
			$.each(nodecss,function(){
			 	var node = this[0],
			 		props = this[1];
				$.each(props,function(key,val){
					var ind = 0,
						//@old store the olds values in an array
						old = val[0].match( digits );
					node.style[key] = val[1].replace(rCssValue,function(exp,num,unit){
						old[ind] = old[ind] || "0";
						var finalvalue = Number(old[ind]) + ( Number(num) - Number(old[ind]) ) * p;							
						ind++;
						return finalvalue + unit;
					});
				});
			});
		},
		duration: opts.duration,
		easing: opts.easing,
		complete: opts.complete
	});
	return this;
}