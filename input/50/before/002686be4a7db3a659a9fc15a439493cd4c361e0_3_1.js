function pf_main() {
	obstacleList = getObstacleList();
	particleList = centeredDistribution(NUM_PARTICLES, obstacleList);
	oldAveParticles = [];
	//randomDistribution(NUM_PARTICLES, obstacleList);
}