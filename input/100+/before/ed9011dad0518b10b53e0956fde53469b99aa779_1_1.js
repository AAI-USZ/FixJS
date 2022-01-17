function(){

	main = xmlDoc.firstChild;
	i = 0;
	for(i in main.childNodes){
		tempNode = main.childNodes[i];
		if (tempNode.nodeName = "element"){
			Z = Number(tempNode.attributes.z);
			this.elementNames[Z] = tempNode.attributes.name;
			this.elementSymbols[Z] = tempNode.attributes.symbol;
		}
	}

	currentNode = xmlDoc.firstChild;
	while(currentNode){
		this.populateTable(currentNode);
		currentNode = currentNode.nextSibling;
	}

}