function showArticles(path,callback){
	var coordStr = pathToCoordinateString(path);
	getArticlesWithinCoordinates(coordStr,callback);
}