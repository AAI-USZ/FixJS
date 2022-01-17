function(model){  
		   var target = this.models;
		   var f = function(m) { 	  
		   return m.toJSON().ticker == model.toJSON().ticker};
		   var result = _.reject(target,f);
		   this.localSave(result);
	   }