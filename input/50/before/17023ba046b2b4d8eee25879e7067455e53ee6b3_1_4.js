function() {
  	var t = this;
  	return [t>>>24, (t>>>16)&0xFF, (t>>>8)&0xFF, t&0xFF].join(".");
  }