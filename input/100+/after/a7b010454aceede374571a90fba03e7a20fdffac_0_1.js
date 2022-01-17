function foundation(){

	// Get proportion
	var p = scale.proportion || 1;

	// define height foundation
	var h1 = 0.16;
	var h2 = 0.08885;

	return STRUCT([
			(SIMPLEX_GRID([[2.24*p],[3.46*p],[h1*p]])).color(colors.foundation), // A
			(SIMPLEX_GRID([[-0.18*p,1.92*p],[-0.18*p,3.1*p],[-h1*p,h2*p]])).color(colors.foundation), // B
			(SIMPLEX_GRID([[-2.24*p,0.14*p],[3.46*p],[h1*p]])).color(colors.hue), // A'
			(SIMPLEX_GRID([[-2.1*p,0.28*p],[-0.18*p,3.1*p],[-h1*p,h2*p]])).color(colors.hue), // B'
			(SIMPLEX_GRID([[-2.38*p,0.32*p],[-0.86*p,1.74*p],[(h1+h2)*p]])).color(colors.hue), // C da sostituire con la porta :)
			(SIMPLEX_GRID([[-2.7*p,0.22*p],[-0.86*p,1.74*p],[(h1+h2)*p]])).color(colors.hue), // D
			(SIMPLEX_GRID([[-3.07*p,0.27*p],[-1.05*p,1.36*p],[h1*p]])).color(colors.hue)
 		]);

}