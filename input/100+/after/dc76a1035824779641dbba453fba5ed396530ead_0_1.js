function sort_and_show(sfunc) {
	sfunc = typeof sfunc !== "undefined" ? sfunc : sort_sim;
	r.sort(sfunc);

	var s = "<table><tr><td onclick='sort_and_show(sort_sim)'>similarity</td><td>flair text</td><td>user</td><td>last /r/buffy post</td><td onclick='sort_and_show(sort_freq_r)'>average post frequency</td></tr>";
	for (x in r) {
		scolor = get_color(r[x].d, 0.3)
		s += "<tr style='background:#eee'><td style='background:#" + scolor + "'>" + (r[x].d*100).toFixed(0) + " %</td><td style='background:#" + scolor + "'>" + r[x].text + "</td><td><a href='http://reddit.com/user/" + r[x].user + "'>" + r[x].user + "</a></td>";
		if (r[x].num_posts === 0) {
			s += "<td style='background:#99f'>none in last 1000 comments</td><td style='background:#99f'>";
		} else if (r[x].num_posts === -1) {
			s += "<td style='background:#99f'>error checking comments</td><td style='background:#99f'>";
		} else {
	  		s += "<td style='background:#" + get_color(elapsed(r[x].last_post) / 7776000, 0.6) + "'>" + nowago(r[x].last_post) + " ago</td><td style='background:#" + get_color(r[x].freq / 5184000, 0.5) + "'>once every " + timeago(r[x].freq) /*+ " (over the last " + nowago(r[x].first_post) + ")"*/;
		}
		s += "</td></tr>";
	}
	s += "</table>";

	var out = document.getElementById("out");
	out.innerHTML = s;
}