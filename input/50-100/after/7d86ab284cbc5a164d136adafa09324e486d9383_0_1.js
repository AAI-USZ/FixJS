function (){
	var userFolder = getUserFolder(); 
	this.getUserFolder = getUserFolder;
	this.storage = (userFolder!==null) ? (path.resolve(userFolder + '/' + modulePackageName) + '/') : null;
	this.local = moduleRoot;
	this.global = webinosRoot;
}