function(id) {
	console.log("Checking to see if has been bummed: " + id);
	if (this.links[id] && this.links[id]['reference']) {
	    console.log("Since this is a reference link, we are going to return the value for this url instead: " + this.links[id]['true_url'] + " which is " +  this.bums[this.links[id]['true_url']]);
	    return this.bums[this.links[id]['true_url']];
	}
	else {
	    console.log("Returning " + this.bums[id]);
	    return this.bums[id];
	}
    }