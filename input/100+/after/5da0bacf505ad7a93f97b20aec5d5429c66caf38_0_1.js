function($page) {

	var $lectTutInfo = $("div[align=left]", $page)[1];
	var $lectureTable = $("table", $lectTutInfo)[0];

	//console.log($lectTable);
	var arrLecture = new Array();

	var bgColor="#EEEEEE";
	var lectureTitle="";
	var arrSession = new Array();

	$("tr:gt(0)", $lectureTable).each(function() {
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
	});
	//console.log(lectureTitle);
	arrLecture.push(new Part(mainTitle, 'lec', arrSession));

	return arrLecture;

	/*
	var $lectureTable = $("table.tableframe:eq(0) ~ table:eq(0)", $page);

	var arrLecture = new Array();

	// if (! /No Lecture Class/.test(this.sPage)) { //has lecture
		//ripping all the lectures
		$("table", $lectureTable).each(function() {
			var sBlock = $("td", this).html();

			//splitting the arrblock, to get separated piece of data
			var arrBlock = sBlock.split('<br>');
			var title = arrBlock[0].trim().substring(3);

			//session manipulation
			var nSession = Math.floor(arrBlock.length/2)-1;
			var arrSession = new Array();

			var phrase1, phrase2, arrCell;
			var res, day, start, end, place;
			var type;

			for (var i = 0; i < nSession; i++) {
				phrase1 = arrBlock[i * 2 + 1];
				phrase2 = arrBlock[i * 2 + 2];
				arrCell = new Array();

				res = LESSON_TIME_RE.exec(phrase1);
				day = convertDay(res[1]);
				start = parseInt(res[2]);
				end = parseInt(res[3]);
				place = res[4];

				// test if number is half hour
				if ((start) % 100 != 0) {
					start = start - 30;
				}
				if ((end) % 100 != 0) {
					end = end + 30;
				}

				type = phrase2.indexOf("EVEN") != -1 ? 2 :
					phrase2.indexOf("ODD") != -1 ? 1 : 0;

				//pushing cells that this session will occupy
				for (var t = start; t < end; t += 100) {
					arrCell.push('w' + day + 't' + t);
				}

				//creating the particular session object, and push into the lecture.
				arrSession.push(
					new Session(day,start,end,type,place,arrCell));
			}//end of session manipulation

			//insert new lecture
			arrLecture.push(new Part(title, 'lec', arrSession));
		});

	// }//end if

	return arrLecture;
	*/
}