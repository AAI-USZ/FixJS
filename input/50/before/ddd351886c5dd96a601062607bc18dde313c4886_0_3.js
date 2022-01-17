function nextChapter()

{

	var chapter = writerId++;

	var title = chapters[writerId];

	if (title.length > 0)

	{

		document.write("<a name=\"ch" + chapter + "\"><h1>" + title + "</h1></a>\n");

	}

}