function(name){

		var self = this;

		if (this.isLoaded(name)) return;



	    var request = new XMLHttpRequest();

	    request.open("GET", vxl.def.lut.folder+'/'+name+'.lut');

	    request.onreadystatechange = function() {

	      if (request.readyState == 4) {

		    if(request.status == 404) {

				alert (name + ' does not exist');

				vxl.go.console('LookupTableManager: '+name + ' does not exist');

			 }

			else {

				self.handle(name,JSON.parse(request.responseText));

			}

		  }

	    };

		request.send();

}