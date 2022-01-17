function chapterLink(id)

{

	var chapter = id + 1;

	var title = chapters[id];

	if (title.length > 0)

	{

		document.write("<li><a href=\"#ch" + chapter + "\">" + title + "</a></li>\n");

	}

}