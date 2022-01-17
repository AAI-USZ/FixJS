function (){
	for(var i=2;i--;){
		var monster = new Thing(this.models.monster, {
			position: new THREE.Vector3(1000*Math.random()-500, 1000*Math.random()-500, 0),
			scale: new THREE.Vector3(0.1,0.1,0.1),
			animation: {
				interpolace: 50,
				startingAnim: "walking",
				modelAnimations: {
					// štěpán chce animovat i stání, good luck
					standing: [1,1],
					walking: [1,23]
				},
			}
		})
		this.objects.push( monster );
	}
	
	this.objects.push( new Environment(this.textures.steel, 0, 0, 0, 2400, 1200, false) );
	
	// todo: udělat to obecný a hezký -> světlo = lampa
	this.objects.push( new Lamp(this.models.lamp, {
			scale: new THREE.Vector3(100,100,100),
			position: new THREE.Vector3(0,0,0),
			light:{
				color:0xffffff,
				position: new THREE.Vector3(0.65,2,0),
				intensity:1,
			}
		}
		));
	
	// spustí hudbu
	// this.sounds.solarFields.play();
}