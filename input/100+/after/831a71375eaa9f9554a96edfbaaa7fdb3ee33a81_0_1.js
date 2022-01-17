function(line) {
	var match = line.match(this.re);
	if (match && match.length>=2) {
	    if (this.strArray.length>0) {
		if (this.hasDefaultValue) { // Existing entry is a default value, overwrite
		    this.insert_line(match[1]);
		}
		else { // Signal the beginning of a new talk by new Item
		    var tmp=new Item(this.id);
		    tmp.re = this.re;
		    tmp.joiner = this.joiner;
		    tmp.hasDefaultValue=true;
		    tmp.insert_line(match[1]);
		    tmp.show = this.show;
		    return tmp;
		}
	    }
	    else {
		this.insert_line(match[1]);
	    }
	    return true;
	}
	return false;
    }