function() {
		var url = "http://domain.com/path/file/[0-9]and{0}and{0}and{0}and{0}.jpg";
		var links = Fuskr.GetLinks(url);
		equal(true, !!links.push, "Result should be an array");
		equal(10, links.length, "Link array length should be 10");
		equal(links[0], "http://domain.com/path/file/0and0and0and0and0.jpg");
		equal(links[1], "http://domain.com/path/file/1and1and1and1and1.jpg");
		equal(links[2], "http://domain.com/path/file/2and2and2and2and2.jpg");
		equal(links[3], "http://domain.com/path/file/3and3and3and3and3.jpg");
		equal(links[4], "http://domain.com/path/file/4and4and4and4and4.jpg");
		equal(links[5], "http://domain.com/path/file/5and5and5and5and5.jpg");
		equal(links[6], "http://domain.com/path/file/6and6and6and6and6.jpg");
		equal(links[7], "http://domain.com/path/file/7and7and7and7and7.jpg");
		equal(links[8], "http://domain.com/path/file/8and8and8and8and8.jpg");
		equal(links[9], "http://domain.com/path/file/9and9and9and9and9.jpg");
	}