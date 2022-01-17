function()
{
	document.getElementById("thelist").value="";
	var string="";
	var j;
	for (var i = 0; i < this.references.length; i++)
	{    
		if( (j=this.getPaperIndex(this.references[i].title.split(".  ")[2]) ) >=0 )
			string = string + jsonPapers[j].author + ". " +  jsonPapers[j].title + ". " +  jsonPapers[j].publisher + ". " +  jsonPapers[j].publisher + ", volume " + jsonPapers[j].volume + ", pages " + jsonPapers[j].startpage + "-" + jsonPapers[j].lastpage + "\n";
	}
	document.getElementById("thelist").value = string;
}