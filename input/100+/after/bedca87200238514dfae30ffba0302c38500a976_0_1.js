function (){
	
	for(var i=2;i--;){
		var monster = new SolidObject(this.models.monster, 1000*Math.random()-500, 1000*Math.random()-500, {
			scale: new THREE.Vector3(0.1,0.1,0.1),
			interpolace: 50,
			startingAnim: "walking",
			modelAnimations: {
		        // štěpán chce animovat i stání, good luck
		        standing: [1,1],
		        walking: [1,23]
		    }
		})
		this.objects.push( monster );

	}
	
	/*this.objects.push( new SolidObject(this.models.kostka, 100,100, {
		scale: new THREE.Vector3(100,100,100),
		interpolace:50,
		startingAnim:"rotace",
		modelAnimations:{
			rotace:[1,20],
			translace:[20,50],
			}
		}));*/
	this.objects.push( new Environment(this.textures.steel, 0, 0, 0, 2400, 1200, false) );

	// todo: udělat to obecný a hezký -> světlo = lampa
	var light = new THREE.PointLight("0xFFFFFF", 10);
	light.position.z = 10
	light.position.x = 100
	
	this.objects.push({mesh: light});
	/*this.objects.push( new Lamp(this.models.lamp, 0,0, {
			scale: new THREE.Vector3(100,100,100),
			light:{
				on:true,
				color:0xffffff,
				position: new THREE.Vector3(10,0,10),
				intensity:10,
			}
		}
		));*/
}