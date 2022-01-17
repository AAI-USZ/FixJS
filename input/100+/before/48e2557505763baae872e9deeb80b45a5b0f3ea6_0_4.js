function()
{
	document.getElementById("thelist").value="";
	var string="";
	
	for (var j = 0; j < this.references.length; j++)
	{
		string = string + jsonPapers[j].author + ". " +  jsonPapers[j].title + ". " +  jsonPapers[j].publisher + ". " +  jsonPapers[j].publisher + ", volume " + jsonPapers[j].volume + ", pages " + jsonPapers[j].startpage + "-" + jsonPapers[j].lastpage + "\n";
	}
	document.getElementById("thelist").value = string;
}