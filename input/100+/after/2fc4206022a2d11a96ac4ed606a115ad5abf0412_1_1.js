function runFilter(reading) {
	assignWeights(reading, particleList, obstacleList);
	particleList = resample(particleList, NUM_PARTICLES);
	transition(particleList);
	
	//console.log(pf_state);
	if(pf_state == 2) {
		paintParticleList2(particleList);
	} else if (pf_state == 1) {
		var totals = {x:0,y:0,vx:0,vy:0};
		for(var i = 0; i < particleList.length; i++) {
			var p = particleList[i];
			totals.x += p.p.x;
			totals.y += p.p.y;
			totals.vx += Math.cos(p.theta);
			totals.vy += Math.sin(p.theta);
		}
		var aveParticle = [
				totals.x/particleList.length,
				totals.y/particleList.length,
				my_atan(totals.vy/particleList.length, 
						totals.vx/particleList.length) 
				];
		setParticleList([aveParticle]);
	} else if (pf_state == 0) {
		setParticleList([]);
	}
}