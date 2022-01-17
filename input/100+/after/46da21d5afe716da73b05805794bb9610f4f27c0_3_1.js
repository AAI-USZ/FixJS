function SolidObject(){
	// pouze výplň, dokud se neobjeví opravdové geometry, material a mesh
	this.geometry = new THREE.Geometry();
	this.material = new THREE.MeshFaceMaterial();
	// this.mesh = new THREE.Mesh( this.geometry, this.material );

	// this.generateBoundingBox();
	// this.initAnimation();
}