function() {
		var out = new Array();
		var temp=null;
		for(var i=0,j=_this.restaurants.length; i<j; i++){
		  temp=_this.restaurants[i].getCampaigns();
		  for(var i=0,j=temp.length; i<j; i++){
			out.push(temp[i]);
		  };
		};
		return out;
	}