function(shadow){

		var args;

		var result = [];

		(','+shadow).replace(/(-?[\d]+)(?:px)?|(#\w+)|inset|,/ig,function(a,px,color){

			if(px){

				args.push(parseInt(px)||0);

			}else if(color){

				args[1] = a;

			}else if(a == 'inset'){//insert

				args[0] = true;

			}else if(a == ','){

				args = [false,'#000']

				result.push(args);

			}

		})

		

		var el = document.getElementById(this.id);

		var el = bg(el);

//		var shadow = el.firstChild;//radius;

//		while(var i = 0;i<result.length;i++){}

		var shadowEl = el.lastChild;//radius;

		while(args.length<6){

			args.push(0)

		}

		args.unshift(shadowEl,el.offsetWidth,el.offsetHeight)

		setupShadow.apply(null,args)

		

	}