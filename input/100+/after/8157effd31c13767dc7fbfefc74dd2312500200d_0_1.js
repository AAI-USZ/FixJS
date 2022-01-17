function(){   
    var e = this.extremis; 
    var diff = e.position.clone().subSelf(this.position);
    var length = diff.length(), dir = diff.normalize();
    var axis = new THREE.Vector3(0,1,0).crossSelf(diff);
    var radians = Math.acos( new THREE.Vector3( 0, 1, 0 ).dot( dir ) );

    this.matrix = new THREE.Matrix4().makeRotationAxis( axis.normalize(), radians );
    this.scale.set( length, length, length);
    this.rotation.getRotationFromMatrix( this.matrix );
}