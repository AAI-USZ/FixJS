function getChan(channel) {
    for(var x in channels){
        if(channels[x].channel == channel || channels[x].feed == channel){
            return x;
        }
    }
}