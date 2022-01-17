function(object3d){
		var uniforms	= {
			time	: { type: "f", value: 1.0 },
			scale	: { type: "f", value: scale }
		};
		
		var material	= new THREE.ShaderMaterial({
			uniforms	: uniforms,
			vertexShader	: tQuery.Object3D.prototype.useFileballMaterial._vertexShaderText,
			fragmentShader	: tQuery.Object3D.prototype.useFileballMaterial._fragmentShaderText
		});
		
		object3d.material	= material;
		
		tQuery.world.loop().hook(function(delta, now){
			uniforms.time.value += 0.275 * delta;
		});
	}