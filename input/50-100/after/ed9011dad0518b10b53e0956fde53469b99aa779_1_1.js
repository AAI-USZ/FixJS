function(urlString){
		_xml.ignoreWhite = true;
        if(_xml.onLoad){
        	this.constructNuclids();
        }
        else
        {
        	console.log("unable to load files");
        }
        _xml.load(urlString);

}