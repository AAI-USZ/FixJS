function showArticles(path,callback){

	if(path == null){
		path = retrievePolygon();
	}

	var coordStr = pathToCoordinateString(path);

	getArticlesWithinCoordinates(coordStr,callback);
}