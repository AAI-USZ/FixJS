function($page) {
	var $lectTutInfo = $("div[align=left]", $page)[2];
	var $tutorialTable = $("table", $lectTutInfo)[0];

	var arrTutorial = new Array();

	var bgColor="#EEEEEE";
	var mainTitle="";
	var arrSession = new Array();
	var tutType;

	$("tr:gt(0)", $tutorialTable).each(function() {
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
		
		tutType = type.indexOf("LABORATORY") != -1 ? 'lab' : 'tut';

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
			arrTutorial.push(new Part(mainTitle, tutType, arrSession));
			arrSession = new Array();
			bgColor = $tr.attr('bgcolor');
		}

		mainTitle = title;
		arrSession.push(
					new Session(day,start,end,recType,place,arrCell));
	});
	//console.log(lectureTitle);
	arrTutorial.push(new Part(mainTitle, tutType, arrSession));

	return arrTutorial;
/*
	var $tutorialTable = $("table.tableframe:eq(0) ~ table:eq(1)", $page);

	var arrTutorial = new Array();

	// if (! /No Tutorial Class/.test(this.sPage)) { //has tutorial
		//ripping all the tutorials
		$("table", $tutorialTable).each(function() {
			var sBlock = $("td", this).html();

			//splitting the arrblock, to get separated piece of data
			var arrBlock = sBlock.split('<br>');
			var title = arrBlock[0].trim().substring(3);

			//tutorial type
			var tutType = title.indexOf("LABORATORY") != -1 ? 'lab' : 'tut';

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

				type = phrase2.indexOf("EVEN") != -1 ? 2 :
					phrase2.indexOf("ODD") != -1 ? 1 : 0;

				//pushing cells that this session will occupy
				for (var t = start; t < end; t += 100) {
					arrCell.push('w' + day + 't' + t);
				}

				//creating the particular session object, and push into the tutorial
				arrSession.push(
					new Session(day,start,end,type,place,arrCell));
			}//end of session manipulation

			//insert new tutorial
			arrTutorial.push(new Part(title, tutType, arrSession));
		});

	// }//end if

	return arrTutorial;
	*/
}