function formatQuery(obj){
		var li = [];

		obj = obj || {};

		if (typeof obj === "string") {
			li = obj.split("&");
		} else {
			for(var k in obj){
				if(obj.hasOwnProperty(k)){
					li[li.length] = k + '=' + obj[k];
				}
			}
		}

		return li;
	}