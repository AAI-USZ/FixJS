function(line) {
	var match = line.match(this.re);
	if (match && match.length>=2) {
	    if (this.strArray.length>0) {
		if (this.hasDefaultValue) {
		    this.strArray = [match[1]];
		    this.hasDefaultValue=false;
		}
		else {
		    var tmp=new Item(this.id);
		    tmp.re = this.re;
		    tmp.joiner = this.joiner;
		    tmp.hasDefaultValue=false;
		    if (match[1].length>0)
		    tmp.strArray.push(match[1]);
		    tmp.show = this.show;
		    return tmp;
		}
	    }
	    else if (match[1].length>0) {
		this.strArray.push(match[1]);
		this.hasDefaultValue=false;
	    }
	    return true;
	}
	return false;
    }