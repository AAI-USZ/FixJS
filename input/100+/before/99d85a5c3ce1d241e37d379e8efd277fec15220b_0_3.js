function($){
	Backbone.Model.prototype.fetch = function(options){
		//options is a object that expects to have
		//defaults, success callback, and error callback

		var defaults = {
				success : function(){
					//console.log("success");
				},

				error : function(){
					//console.log("error");
				}
			},
			self = this;

		options = _.extend({},defaults,options);

		if(options.defaults){
			$.ajax.setup(options.defaults);
		}

		return $.ajax({
			url : this.fetchUrl || this.url,
			data : {'id' : self.id},
			success : function(){
				$.when(
					populate.apply(self,Array.prototype.slice.call(arguments))
				).then(
					options.success.call()
				);
			},
			error : options.error || function(){
				//console.log("error fetching model");
			}
		});
	};

	var populate = function(data, textStatus,jqXHR){
		if(typeof data === 'object'){
			for(var key in data){
				this.set(key,data[key]);
			}
		}
		//trigger a populate event
		this.trigger('populate');
	};

}