function(x,y,z) {

	

	if (x instanceof Array){

		vec3.set(vec3.create(x), this.position)

	}

	else if (x instanceof determineMatrixArrayType()){

		vec3.set(x, this.position)

	}

	else{

    	vec3.set(vec3.createFrom(x,y,z), this.position);

   	}

    this.update();

	this.debugMessage('Camera: Updated position: ' + this.position.toString(1));

}