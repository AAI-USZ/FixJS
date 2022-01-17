function SolidObject(model, x, y, options){
    this.options = options === undefined ? {} : options;
    this.geometry = model;
    this.material = new THREE.MeshFaceMaterial();

    // bounding box pro debugging
    this.geometry.computeBoundingBox()
    bounding_geometry = new THREE.CubeGeometry( 
        this.geometry.boundingBox.max.x-this.geometry.boundingBox.min.x,
        this.geometry.boundingBox.max.y-this.geometry.boundingBox.min.y,
        this.geometry.boundingBox.max.z-this.geometry.boundingBox.min.z );
    bounding_material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
    bounding_mesh = new THREE.Mesh( bounding_geometry, bounding_material );
    bounding_mesh.position.y = (this.geometry.boundingBox.max.y-this.geometry.boundingBox.min.y)/2

    this.mesh = new THREE.Mesh( this.geometry, this.material );
    this.mesh.position.set(x, y, 0);
    if( this.options.scale !== undefined )
        this.mesh.scale = this.options.scale;
    this.mesh.rotation.x = Math.PI/2;
    if( this.options.position !== undefined )
	this.mesh.position = this.options.position;

    // takhle se dají přidávat child objekty v three.js
    this.mesh.add( bounding_mesh );
	
    if( this.options.interpolace !== undefined ){

        this.modelAnimations = options.modelAnimations;

        this.animated = true;
        // materiály se mění v závislosti na čase
        this.geometry.materials[0].morphTargets = true;
        // přídání času vytvoření, vhodné pro animace, dále také začáteční a konečný frame, součný keyframe
        // a celková délka animace
	this.interpolation = this.options.interpolace;
	//metoda pro přepínání mezi animacemi
	this.toogleAnim = function ( animID ){
		if(this.modelAnimations[animID] !== undefined){
			if(this.keyframe !== undefined) this.mesh.morphTargetInfluences[this.keyframe] = 0; //Musí se zrušit ovlivňování stavů z minulích animací
			this.creationTime = new Date().getTime(); //Aby animace začala od začátku
			this.borderFrames = [options.modelAnimations[animID][0],options.modelAnimations[animID][1]];
			this.keyframe = this.borderFrames[0]-1;
			this.animLength = this.interpolation*(this.borderFrames[1]-this.borderFrames[0]+1);
		}
		else{
			console.log("No animation with ID " + animID + " for this model");
		}
	};
        this.toogleAnim(this.options.startingAnim); //startingAnim je nová vlastnost objektu options
        }
}