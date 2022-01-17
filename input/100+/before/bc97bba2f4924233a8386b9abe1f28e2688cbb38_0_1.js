function foundation(){

	// Get proportion
	var p = scale.proportion || 1;

	// define height foundation
	var h1 = 0.16;
	var h2 = 0.08885;

	return STRUCT([
			COLOR(colors.foundation)(SIMPLEX_GRID([[2.24*p],[3.46*p],[h1*p]])), // A
			COLOR(colors.foundation)(SIMPLEX_GRID([[-0.18*p,1.92*p],[-0.18*p,3.1*p],[-h1*p,h2*p]])), // B
			COLOR(colors.hue)(SIMPLEX_GRID([[-2.24*p,0.14*p],[3.46*p],[h1*p]])), // A'
			COLOR(colors.hue)(SIMPLEX_GRID([[-2.1*p,0.28*p],[-0.18*p,3.1*p],[-h1*p,h2*p]])), // B'
			//COLOR(colors.hue)(SIMPLEX_GRID([[-2.38*p,0.32*p],[-0.72*p,2.02*p],[(h1+h2)*p]])), // C
			COLOR(colors.hue)(SIMPLEX_GRID([[-2.38*p,0.32*p],[-0.86*p,1.74*p],[(h1+h2)*p]])), // C da sostituire con la porta :)
			COLOR(colors.hue)(SIMPLEX_GRID([[-2.7*p,0.22*p],[-0.86*p,1.74*p],[(h1+h2)*p]])), // D
			COLOR(colors.hue)(SIMPLEX_GRID([[-3.07*p,0.27*p],[-1.05*p,1.36*p],[h1*p]]))
 		]);

}