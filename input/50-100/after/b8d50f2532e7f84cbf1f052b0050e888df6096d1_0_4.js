function chgChan(up_down) {
    var old_chan = cur_chan, this_chan = old_chan;
    if(up_down === 'up' && this_chan > 0){
	this_chan--;
    }else if(up_down !== 'up' && this_chan < channels.length-1){
	this_chan++;
    }
    if(this_chan !== old_chan){
	var parts = channels[this_chan].feed.split("/");
        window.location.hash = "/"+parts[1]+"/"+parts[2]+"/";
    }
}