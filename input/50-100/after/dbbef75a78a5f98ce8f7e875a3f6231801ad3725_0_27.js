function(v) {
	if( v === $_ ) return;
	if(v != null && v.length == 16) this.rawData = v; else this.rawData = [1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0];
}