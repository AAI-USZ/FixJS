function runFilter(reading) {
	assignWeights(reading, particleList, obstacleList);
	particleList = resample(particleList, NUM_PARTICLES);
	transition(obstacleList);
	
	//console.log(pf_state);
	if(pf_state == 2) {
		paintParticleList2(particleList);
	} else if (pf_state == 1) {
		paintParticleList2([getCurAveParticle(particleList)]);
	} else if (pf_state == 0) {
		paintParticleList2([]);
	}
}