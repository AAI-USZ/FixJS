function Environment(texture, x, y, z, width, height, stretch){
	this.geometry = new THREE.PlaneGeometry( width, height, 1, 1 );

	if( !stretch ){
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		// TODO
		texture.repeat.x = width/texture.image.width;
		texture.repeat.y = height/texture.image.height;
	}

	this.material = new THREE.MeshPhongMaterial( { map: texture } );

    this.mesh = new THREE.Mesh( this.geometry, this.material );
    this.mesh.position.set(x, y, z);
    this.mesh.rotation.x = Math.PI/2;
}