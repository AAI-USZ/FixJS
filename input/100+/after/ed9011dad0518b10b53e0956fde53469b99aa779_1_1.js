function(urlString){
	//xmlDoc.getElementsByTagName("to")[0].childNodes[0].nodeValue;
	this.doc = this.loadXMLDoc(urlString);
	this.docElement = this.doc.documentElement;
	this.firstNode=get_firstchild(this.docElement);

}