function checkAnchor(){
    if(currentAnchor != document.location.hash){
        currentAnchor = document.location.hash;
        if(!currentAnchor){
        }else{
            var anchor = currentAnchor.substring(1);
	    var parts = anchor.split("/"); // #/r/videos/id
	    var feed = "/"+parts[1]+"/"+parts[2]+"/.json";
	    var new_chan_name = getChanName(feed);
	    var new_chan_num = getChan(new_chan_name);
	    if(new_chan_name != undefined && new_chan_num != cur_chan){
		if(parts[3] == undefined || parts[3] == null || parts[3] == ''){
                    loadChannel(new_chan_name, null);
		}else{
		    loadChannel(new_chan_name, parts[3]);
		}
	    }else{
		if(videos[new_chan_num] != undefined){
		    loadVideoById(parts[3]);
		}else{
		    loadChannel(new_chan_name, parts[3]);
		}
	    }
        }
    }else{
        return false;
    }
}