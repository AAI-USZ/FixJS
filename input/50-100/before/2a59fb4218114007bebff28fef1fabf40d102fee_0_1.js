function(target, easing){
			
			this.$super(target, easing) ;
			var ctor = target.constructor ;
			
			switch(true){
				case ctor === undefined : // IE 7-
				case (/HTML[a-zA-Z]+Element/.test(ctor)) :
					this.units = {} ;
				break ;
				
				case ctor === Class :
				case ctor === Date :
				case ctor === Number :
				case ctor === String :
				case ctor === Function :
				case ctor === Object :
				default:
					
				break ;
			}
		}