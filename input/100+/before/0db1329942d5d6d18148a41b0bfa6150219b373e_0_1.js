function(idxDataOrig,idxDataOrigMap,verts,norms,texCoords,faces,material,smooth){
	//loop though the indexes to produce streams
	var positions=[];
	var normals=[];
	var uv=[];
	var newfaces=[];
	var idxData=[];
	var idxDataMap={};
	for(var i=0;i<faces.length;i++){
		var data=idxDataOrig[faces[i]];
		var idx=idxDataMap[data];
		if((typeof idx === "undefined") || !smooth){
			idxData.push(data);
			idxDataMap[data]=idxData.length-1;
			newfaces.push(idxData.length-1);
		}else{
			newfaces.push(idxDataMap[data]);
		}
	}
	faces=newfaces;
	for(i=0;i<idxData.length;i++){
		if(idxData[i].indexOf("/")>0) var vertData=idxData[i].split("/");
			else var vertData=[idxData[i]];
		if(!verts[vertData[0]-1]) GLGE.error(vertData[0]);
		positions.push(verts[vertData[0]-1][1]);
		positions.push(verts[vertData[0]-1][2]);
		positions.push(verts[vertData[0]-1][3]);
		if(vertData[1]){
			uv.push(texCoords[vertData[1]-1][1]);
			uv.push(texCoords[vertData[1]-1][2]);
		}
		if(vertData[2]){
			normals.push(norms[vertData[2]-1][1]);
			normals.push(norms[vertData[2]-1][2]);
			normals.push(norms[vertData[2]-1][3]);
		}
	}
	if(positions.length/3>65024){
		var newPositions=[];
		var newNormals=[];
		var newUVs=[];
		for(var i=0;i<faces.length;i++){
			newPositions.push(positions[faces[i]*3],positions[faces[i]*3+1],positions[faces[i]*3+2]);
			if(normals.length>0) newNormals.push(normals[faces[i]*3],normals[faces[i]*3+1],normals[faces[i]*3+2]);
			if(uv.length>0) newUVs.push(normals[faces[i]*2],normals[faces[i]*2+1]);
		}
		positions=newPositions;
		normals=newNormals;
		uv=newUVs;
		faces=[];
	}
	var multiMat=new GLGE.MultiMaterial;
	var mesh=new GLGE.Mesh;
	
	mesh.setPositions(positions);
	if(normals.length>0) mesh.setNormals(normals);
	if(uv.length>0) mesh.setUV(uv);
	if(faces.length>0) mesh.setFaces(faces);
	multiMat.setMesh(mesh);
	multiMat.setMaterial(material);
	this.addMultiMaterial(multiMat);

}