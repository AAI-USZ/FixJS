function eTab(d,i,t,h,c){

	var r = "<table";

	if(typeof i == "undefined"){ r += ' id="' + i + '"'; }

	if(typeof t == "undefined"){ r += ' class="' + t + '"'; }

	r += "<tr>\r\n"	

	for (var k in d.header) {

		r += "	<th";

		if(typeof h == "undefined"){ r += ' class="' + h + '"'; }

		r += "	>" + d.header[k] + "</th>\r\n";

	}

	r += "</tr>\r\n"

	r += "<tbody>\r\n"

		

	for(x in d.rows){

		r += "<tr>\r\n";		

		q = 0;

		for (var k in d.header) {			

			r += "	<td";

			if(typeof c == "undefined"){ r += ' class="' + c + '"'; }

			r += ">" + d.rows[x][q] + "</td>\r\n";

			q++;

		}

		r += "</tr>\r\n";

	

	}	

	r += "</tbody>\r\n"

	r += "</table>\r\n"

	

	return r;

}