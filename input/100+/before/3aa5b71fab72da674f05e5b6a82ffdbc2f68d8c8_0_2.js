function(id) {
	if (this.links[id] && this.links[id]['reference']) {
	    return this.bums[this.links[id]['true_url']];
	}
	else {
	    return this.bums[id];
	}
    }