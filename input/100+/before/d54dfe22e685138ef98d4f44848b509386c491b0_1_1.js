function () {
    	if (this.ports.length == 0) {
	    	var self = this;
	        //console.log("fetching switch " + this.id + " ports")
	        $.ajax({
	            url:hackBase + "/wm/core/switch/" + self.id + '/port/json',
	            dataType:"json",
	            success:function (data) {
	                //console.log("fetched  switch " + self.id + " ports");
	                // console.log(data[self.id]);
	                // create port models
	                // TODO maybe clean up the errors
	                _.each(data[self.id], function(p) {
	                	p.id = self.id+'-'+p.portNumber;
	                	self.ports.add(p, {silent: true});
	                	// console.log(p);
	                });
	                self.ports.trigger('add'); // batch redraws
	            }
	        });
	        // TODO maybe load /features/json here
    	}
    }