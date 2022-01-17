function(){   
    var e = this.extremis; 
    var diff = new THREE.Vector3().copy(e.position).subSelf(this.position);
    var length = diff.length(), dir = diff.normalize();
    var axis = new THREE.Vector3(0,1,0).crossSelf(dir);
    var radians = Math.acos( new THREE.Vector3( 0, 1, 0 ).dot( dir.clone().normalize() ) );
    
    this.matrix = new THREE.Matrix4().makeRotationAxis( axis.normalize(), radians );
    this.rotation.getRotationFromMatrix( this.matrix, this.scale );
    this.scale.set( length, length, length );
}