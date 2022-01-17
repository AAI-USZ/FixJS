function chapterLink(id)

{

	var chapter = id;

	var title = chapters[id - 1];

	if (title.length > 0)

	{

		document.write("<li><a href=\"#ch" + chapter + "\">" + title + "</a></li>\n");

	}

}