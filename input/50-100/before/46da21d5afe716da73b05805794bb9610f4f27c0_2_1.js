function Lamp(model, options){
	
	if(options.light){
		this.light = new THREE.PointLight((options.light.color || 0xffffff), options.light.intensity);
		this.light.position = options.light.position !== undefined ? options.light.position : new THREE.Vector3(0,0,0);
		this.light.add(new SolidObject(model,0,0,options).mesh);
	}

}