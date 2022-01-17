function(GLGE){
/**
* @class parses and displays a warefront object file with mtl material
* @param {string} uid the unique id for this object
* @augments GLGE.Object
*/
GLGE.OpenCTM=function(uid){
	this.multimaterials=[];
	this.materials={};
	this.instances=[];
	this.queue=[];
	this.idMaterials = [];//storaged name of material (string)
	GLGE.Object.call(this,uid);
	GLGE.Assets.registerAsset(this,uid);
}
GLGE.augment(GLGE.Object,GLGE.OpenCTM);
/**
* Gets the absolute path given an import path and the path it's relative to
* @param {string} path the path to get the absolute path for
* @param {string} relativeto the path the supplied path is relativeto
* @returns {string} absolute path
* @private
*/
GLGE.OpenCTM.prototype.getAbsolutePath=function(path,relativeto){
	if(path.substr(0,7)=="http://" || path.substr(0,7)=="file://"  || path.substr(0,7)=="https://"){
		return path;
	}
	else
	{
		if(!relativeto){
			relativeto=window.location.href;
		}
		if(relativeto.indexOf("?")>0){
			relativeto=relativeto.substr(0,relativeto.indexOf("?"));
		}
		//find the path compoents
		var bits=relativeto.split("/");
		var domain=bits[2];
		var proto=bits[0];
		var initpath=[];
		for(var i=3;i<bits.length-1;i++){
			initpath.push(bits[i]);
		}
		//relative to domain
		if(path.substr(0,1)=="/"){
			initpath=[];
		}
		var locpath=path.split("/");
		for(i=0;i<locpath.length;i++){
			if(locpath[i]=="..") initpath.pop();
				else if(locpath[i]!="") initpath.push(locpath[i]);
		}
		return proto+"//"+domain+"/"+initpath.join("/");
	}
};


/**
* loads a resource from a url
* @param {string} url the url of the resource to load
* @param {string} relativeTo the url to load relative to
* @param {function} callback thefunction to call once the file is loaded
* @private
*/
GLGE.OpenCTM.prototype.loadFile=function(url,relativeTo,callback){
	this.loading=true;
	if(!callback) callback=this.loaded;
	if(!relativeTo && this.relativeTo) relativeTo=this.relativeTo;
	url=this.getAbsolutePath(url,relativeTo);
	if(!this.relativeTo) this.relativeTo=url;
	var req = new XMLHttpRequest();
	var that=this;
	if(req) {
		req.overrideMimeType("text/plain")
		req.onreadystatechange = function() {
			if(this.readyState  == 4)
			{
				if(this.status  == 200 || this.status==0){
					that.loading=false;
					callback.call(that,url,this.responseText);
				}else{ 
					GLGE.error("Error loading Document: "+url+" status "+this.status);
				}
			}
		};
		req.open("GET", url, true);
		req.send("");
	}	
}
/**
* loads a wavefront ojvect from a given url
* @param {DOM Element} url the url to retrieve
* @param {string} relativeTo optional the path the url is relative to
*/
GLGE.OpenCTM.prototype.setSrc=function(url,relativeTo){
	this.src=this.getAbsolutePath(url,relativeTo);
	this.loadFile(this.src,relativeTo);
};
/**
* loads a resource from a url
* @param {string} url the url of the resource loaded
* @param {string} objfile the loaded file
* @private
*/
GLGE.OpenCTM.prototype.loaded=function(url,openctmfile){
	var stream = new CTM.Stream(openctmfile);
	var file = new CTM.File(stream);
	this.parseMesh(file);
	this.fireEvent("loaded",{});	
};
/**
* Parses the mesh
* @private
*/
GLGE.OpenCTM.prototype.parseMesh=function(file){

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
};

/**
* Parses the dom element and creates a texture
* @param {domelement} ele the element to create the objects from
* @private
*/
GLGE.Document.prototype.getOpenCTM=function(ele){
	if(!ele.object){
		var rel=this.getAbsolutePath(this.rootURL,null);
		ele.object=new GLGE[this.classString(ele.tagName)];
		//ele.object.setSrc(this.getAbsolutePath(ele.getAttribute("src"),rel));
		ele.object.setSrc(ele.getAttribute("src"),rel);
		ele.removeAttribute("src");
		this.setProperties(ele);
	}
	return ele.object;
}
}