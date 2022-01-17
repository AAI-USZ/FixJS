function(particle){
	//check to see if the conditions are right to spawn a particle
	decay_energy = 0;
	if(this.charge < 0 && ( this.Z != 0 || this.N != 0 )){ //if the charge is negative
		if(Math.random() < 0.01){
			electrons--;
			tempParticle = new nucleotron.Particle(type, 0, 0, 1);
			this.spawnParticles(tempParticle, particle.getPosition.x, particle.getPosition.y);
			decay_energy = 5;
		}
	} 
	else if(Math.random() > particle.Isotope.decayProbab){ //need to initialize ISOTOPE
		rand = Math.random();
		for(i = 0; i < particle.Isotope.mechanisms.length; i++){
			mechs = particle.Isotope.mechanisms[i];
			
			if(rand < mechs.probability){
				kev = particle.Isotope.massexcess;
				tempMethod = this.decay(mechs);
				newKev = particle.Isotope.massexcess;
				if(newKev < 2){
					newKev += tempMethod.isotope.massexcess;
				}
				decay_energy = (kev - newKev);
				break;
			}
			
			else{
				rand -= mechs.probability;
				//ignore decay method
				//console.log("ignoring decay method");
			}
		}


	}

	//if(tempParticle){
		//create new particle
	//	this.spawnParticles(tempParticle, 50, 50);
	//}


}