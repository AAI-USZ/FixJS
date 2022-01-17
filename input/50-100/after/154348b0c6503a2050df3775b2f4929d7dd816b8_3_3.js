function getCurAveParticle(particleList) {
	var curAve = getAverageParticle(particleList);
	oldAveParticles.push(curAve);
	if(numAveParticles == 0)
		oldAveParticles.shift();
	else
		numAveParticles--;
	return getAverageParticle(oldAveParticles);
}