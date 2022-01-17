function()
{
	document.getElementById("thelist").value="";
	var string="";
	var j;
	for (var i = 0; i < this.references.length; i++)
	{   
		if( (j=this.getPaperIndex(this.references[i].title.split(".  ")[2]) ) >=0 )
		{
			  string += jsonPapers[j].author + ", " +  jsonPapers[j].title + ", ";
			  if(jsonPapers[j].publisher)
				string += jsonPapers[j].publisher + ", ";
			  if(jsonPapers[j].month != 0)
					string += jsonPapers[j].month + "\/";
			  string += jsonPapers[j].date + ", ";
			  if( jsonPapers[j].volume )
				string += "volume " + jsonPapers[j].volume + ", ";
			  if( jsonPapers[j].startpage && jsonPapers[j].lastpage )
				string += "pp. " + jsonPapers[j].startpage + "-" + jsonPapers[j].lastpage + ", ";
			  if( jsonPapers[j].doi )
				string += "doi:" + jsonPapers[j].doi;
			  
			  
			  string += "\n";
		}
	}
	document.getElementById("thelist").value = string;
}