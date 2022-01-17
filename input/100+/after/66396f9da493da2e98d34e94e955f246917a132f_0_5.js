function( el ){
	var mx=this.metorix, tp=this.tpos.current[0];
	return ( mx.x<=tp.x && tp.x<=mx.r && mx.y<=tp.y && tp.y<=mx.b );
}