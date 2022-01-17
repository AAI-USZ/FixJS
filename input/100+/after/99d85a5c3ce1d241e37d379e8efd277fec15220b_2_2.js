function(){
//this would benefit from a memoization pattern to decrease the number
//of loops per iteration

//this should have a callback to it as well, that way we can use a deferred
	Backbone.View.prototype.populate = function(obj,prefix){
		var self = this;

		return $.Deferred( function(dfd){
			var elem;

			obj = obj || self.model.attributes;

			if($.isArray(obj)){
				for(var i = 0; i < obj.length; i++){
					self.populate(obj[i]);
				}
			}

			for(var key in obj){
				if(typeof obj[key] !== 'object'){
					$elem = self.$el.find("#" + key);

					if(!$elem.length){
						$elem = self.$el.find("#" + prefix + '\\.' + key);
					}

					if($elem.length){
						self.set($elem,obj[key]);
					}
				}
				else{
					if(prefix){
						self.populate(obj[key],prefix + '\\.' + key);
					}
					else{
						self.populate(obj[key],key);
					}
				}
			}

			dfd.resolve();

		}).promise();
	};

	Backbone.View.prototype.set = function($elem, val){
		if($elem.is(":radio")){

			$elem = $elem.filter("[value=" + val + "]");

			if($elem.length){
				$elem.attr('checked',true);
			}
		}
		else if($elem.is("input") || $elem.is("select")){
			$elem.val(val);
		}
		else{
			$elem.html(val);
		}
	};

}