function runFilter(reading) {
	assignWeights(reading, particleList, obstacleList);
	particleList = resample(particleList, NUM_PARTICLES);
	transition(particleList);
	
	//console.log(pf_state);
	if(pf_state == 2) {
		paintParticleList2(particleList);
	} else if (pf_state == 1) {
		var totals = [0,0,0];
		for(var i = 0; i < particleList.length; i++) {
			var p = particleList[i];
			totals[0] += p.p.x;
			totals[1] += p.p.y;
			totals[2] += p.theta;
		}
		var aveParticle = [
				totals[0]/particleList.length,
				totals[1]/particleList.length,
				totals[2]/particleList.length
				];
		setParticleList([aveParticle]);
	} else if (pf_state == 0) {
		setParticleList([]);
	}
}