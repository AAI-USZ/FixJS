function transition(obstacles) {
	for(var i = 0; i < particleList.length; i++) {
		var newParticle = null;
		while(newParticle == null || !stateIsValid(newParticle, obstacles)) {
			newParticle = createNewState(
							particleList[i],
							Math.random()*40-20,
							Math.random()*Math.PI/3 - Math.PI/6
							);
		}
		particleList[i] = newParticle;
	}
}