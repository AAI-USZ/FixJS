function(file){

	var positions = file.body.vertices;
	var normals = file.body.normals || [];
	var uv = file.body.uvMaps ? file.body.uvMaps[0].uv : [];
	var faces = file.body.indices || [];
	
	if (positions.length/3>65024) {
		var newPositions=[];
		var newNormals=[];
		var newUVs=[];
		for (var i=0; i<faces.length; i++) {
			newPositions.push(positions[faces[i]*3],positions[faces[i]*3+1],positions[faces[i]*3+2]);
			if(normals.length>0) newNormals.push(normals[faces[i]*3],normals[faces[i]*3+1],normals[faces[i]*3+2]);
			if(uv.length>0) newUVs.push(uv[faces[i]*2],uv[faces[i]*2+1]);
		}
		positions=newPositions;
		normals=newNormals;
		uv=newUVs;
		faces=[];
	}
	
	var mesh=new GLGE.Mesh;
	mesh.setPositions(positions);
	if(normals.length>0) mesh.setNormals(normals);
	if(uv.length>0) mesh.setUV(uv);
	if(faces.length>0) mesh.setFaces(faces);	
	
	var multiMat=new GLGE.MultiMaterial;
	multiMat.setMesh(mesh);
	multiMat.setMaterial(new GLGE.Material);
	this.addMultiMaterial(multiMat);
}