function wf_loop() {
	var leftDist = readDistSensors()[0];
	
	var normal = leftDist-100;
	if (normal < -10) {
		wfpow1 = .4;
		wfpow2 = -.4;
	} else if (normal > 10) {
		wfpow1 = .4;
		wfpow2 = .6;
	} else {
		wfpow1 = .8;
		wfpow2 = .8;
	}
	
	setMotorPowers(wfpow1, wfpow2);
}