function() {
		var $tr = $(this);

		if ($('td', $tr).length < 2) {
			return;
		}

		var classNo = $('td:eq(0)', $tr).text().trim();
		var type = $('td:eq(1)', $tr).text().trim();
		var recurrence = $('td:eq(2)', $tr).text();
		var weekday = $('td:eq(3)', $tr).text().trim();
		var start = parseInt($('td:eq(4)', $tr).text());
		var end = parseInt($('td:eq(5)', $tr).text());
		var place = $('td:eq(6)', $tr).text().trim();

		var title = type + " [" + classNo + "] ";

		var recType = 0;
		if (recurrence.indexOf("ODD") > -1) 
			recType = 1;
		else if (recurrence.indexOf("EVEN") > -1)
			recType = 2;

		var day = convertDay(weekday);

		var arrCell = new Array();

		// test if number is half hour
		if ((start) % 100 != 0) {
			start = start - 30;
		}
		if ((end) % 100 != 0) {
			end = end + 30;
		}

		//pushing cells that this session will occupy
		for (var t = start; t < end; t += 100) {
			arrCell.push('w' + day + 't' + t);
		}


		if ($tr.attr('bgcolor') != bgColor) {
			//console.log(lectureTitle);
			arrLecture.push(new Part(mainTitle, 'lec', arrSession));
			arrSession = new Array();
			bgColor = $tr.attr('bgcolor');
		}

		mainTitle = title;
		arrSession.push(
					new Session(day,start,end,recType,place,arrCell));
	}