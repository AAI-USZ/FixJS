function( el ){
	var mx=this.metorix, tp=this.tpos.current[0];
console.log('inE '+mx.x+' '+tp.x+' '+mx.r+', '+mx.y+' '+tp.y+' '+mx.b);
	return ( mx.x<=tp.x && tp.x<=mx.r && mx.y<=tp.y && tp.y<=mx.b );
}