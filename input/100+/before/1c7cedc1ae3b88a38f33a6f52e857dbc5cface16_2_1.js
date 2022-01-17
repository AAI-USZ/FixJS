function updateOptions() {
		kabinen = calendar.options.kabinen;
		if(kabinen == undefined || calendar.options.showKabinen == undefined || calendar.options.showKabinen == false){
			kabinen = {count: 1};
		}
		
		tm = opt('theme') ? 'ui' : 'fc';
		nwe = opt('weekends') ? 0 : 1;
		firstDay = opt('firstDay');
		if (rtl = opt('isRTL')) {
			dis = -1;
			dit = colCnt - 1;
		}else{
			dis = 1;
			dit = 0;
		}
		minMinute = parseTime(opt('minTime'));
		maxMinute = parseTime(opt('maxTime'));
		colFormat = opt('columnFormat');
	}