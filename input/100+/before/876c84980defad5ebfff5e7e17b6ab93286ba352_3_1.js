function() {
		var url = "http://domain.com/path/file/[8-16].jpg";
		var links = Fuskr.GetLinks(url);
		equal(true, !!links.push, "Result should be an array");
		equal(9, links.length, "Link array length should be 9");
		equal(links[0], "http://domain.com/path/file/8.jpg", "First element wrong");
		equal(links[1], "http://domain.com/path/file/9.jpg", "Second element wrong");
		equal(links[2], "http://domain.com/path/file/10.jpg", "Third element wrong");
		equal(links[3], "http://domain.com/path/file/11.jpg", "Forth element wrong");
		equal(links[8], "http://domain.com/path/file/16.jpg", "Last element wrong");
	}