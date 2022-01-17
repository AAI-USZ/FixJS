function() {
	var g_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
		j_days_in_month = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29],
		div = function(a, b) { return ~~(a / b); },
		remainder = function(a, b) { return a - div(a, b) * b; };

	function gregorian_to_jalali(g) {
		var gy, gm, gd, jy, jm, jd, g_day_no, j_day_no, j_np, i;

		gy = g[0]-1600;
		gm = g[1]-1;
		gd = g[2]-1;

		g_day_no = 365*gy+div((gy+3),4)-div((gy+99),100)+div((gy+399),400);
		for (i=0;i<gm;++i) g_day_no += g_days_in_month[i];
		if (gm>1 && ((gy%4==0 && gy%100!=0) || (gy%400==0))) ++g_day_no; //leap and after Feb
		g_day_no += gd;
		
		j_day_no = g_day_no-79;
		
		j_np = div(j_day_no, 12053);
		j_day_no = remainder(j_day_no, 12053);

		jy = 979+33*j_np+4*div(j_day_no,1461);
		j_day_no = remainder(j_day_no, 1461);
		if (j_day_no >= 366) {
		   jy += div((j_day_no-1),365);
		   j_day_no = remainder((j_day_no-1), 365);
		}

		for (i = 0; i < 11 && j_day_no >= j_days_in_month[i]; ++i) j_day_no -= j_days_in_month[i];
		jm = i+1;
		jd = j_day_no+1;

		return [jy, jm, jd];
	}

	function jalali_to_gregorian(j) {
		var gy, gm, gd, jy, jm, jd, g_day_no, j_day_no, leap, i;

		jy = j[0]-979;
		jm = j[1]-1;
		jd = j[2]-1;
		j_day_no = 365*jy + div(jy,33)*8 + div((remainder (jy, 33)+3),4);
		for (i=0; i < jm; ++i) j_day_no += j_days_in_month[i];

		j_day_no += jd;
		g_day_no = j_day_no+79;

		gy = 1600 + 400*div(g_day_no,146097); /* 146097 = 365*400 + 400/4 - 400/100 + 400/400 */
		g_day_no = remainder(g_day_no, 146097);

		leap = 1;
		if (g_day_no >= 36525) { /* 36525 = 365*100 + 100/4 */
		   g_day_no--;
		   gy += 100*div(g_day_no,36524); /* 36524 = 365*100 + 100/4 - 100/100 */
		   g_day_no = remainder(g_day_no, 36524);
		   
		   if (g_day_no >= 365)
			g_day_no++;
		   else
			leap = 0;
		}
		gy += 4*div(g_day_no,1461); /* 1461 = 365*4 + 4/4 */
		g_day_no = remainder(g_day_no, 1461);		
		if (g_day_no >= 366) {
		   leap = 0;
		   g_day_no--;
		   gy += div(g_day_no, 365);
		   g_day_no = remainder(g_day_no, 365);
		}

		for (i = 0; g_day_no >= g_days_in_month[i] + (i == 1 && leap); i++) g_day_no -= g_days_in_month[i] + (i == 1 && leap);
		gm = i+1;
		gd = g_day_no+1;

		return [gy, gm, gd]
	};

	return {
		toJalali: gregorian_to_jalali,
		toGregorian: jalali_to_gregorian
	};
}