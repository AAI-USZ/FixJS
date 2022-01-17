function(){
		if(dojo.hash){
			console.log('[MIG:fixed] dojo.hash detected. If you would like to enable the bookmarkable feature, require dojox.mobile.bookmarkable instead of dojo.hash');
			if(dojo.require){
				dojo["require"]("dojox.mobile.bookmarkable");
			}else{
				require(["dojox/mobile/bookmarkable"]);
			}
		}
	}