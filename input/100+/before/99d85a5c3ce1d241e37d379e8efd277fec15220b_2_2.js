function(){
//this would benefit from a memoization pattern to decrease the number
//of loops periteration

//this should have a callback to it as well, that way we can use a deferred
	Backbone.View.prototype.populate = function(obj,prefix){
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
	};

	Backbone.View.prototype.set = function($elem, val){

		if($elem.is("input")){
			$elem.val(val);
		}
		else{
			$elem.html(val);
		}
	};

}