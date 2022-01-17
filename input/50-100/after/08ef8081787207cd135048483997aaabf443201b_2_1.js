function(name) {
    var self = this, indx = -1;

    for(var i = 0, len = self._players.length; i < len; ++i) {
	if(self._players[i].name == name) {
	    indx = i;
	    break;
	}
    }

    if(indx > -1) {
        self._players.splice(indx, 1);
	return true;
    } else {
	return false;
    }
}