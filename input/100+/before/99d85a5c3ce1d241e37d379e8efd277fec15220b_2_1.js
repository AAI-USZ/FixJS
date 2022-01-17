function(obj,prefix){
		var elem;

		obj = obj || this.model.attributes;

		if($.isArray(obj)){
			for(var i = 0; i < obj.length; i++){
				this.populate(obj[i]);
			}
		}

		for(var key in obj){

			if(typeof obj[key] === 'string'){
				$elem = $("#" + key);

				if(!$elem.length){
					$elem = $("#" + prefix + '\\.' + key);
				}

				if($elem.length){
					this.set($elem,obj[key]);
				}
			}
			else{
				if(prefix){
					this.populate(obj[key],prefix + '\\.' + key);
				}
				else{
					this.populate(obj[key],key);
				}
			}
		}
	}