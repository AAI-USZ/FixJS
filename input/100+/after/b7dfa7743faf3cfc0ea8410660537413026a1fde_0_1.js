function go() {
	var newflair = document.getElementById("newflair").value;
	var out = document.getElementById("out");

	var len_div = document.getElementById("len_span");
	len_span.innerHTML = newflair.length + "/42 characters";
	len_span.style.background = "#"+get_color(newflair.length/42, 0.6)

	//r = [Array(a, dice_coefficient(a, newflair)) for each (a in flairs)];
	var r = Array();
	for (var x in flairs) {
		var d = dice_coefficient(flairs[x]["text"], newflair);
		if (d !== 0) {
			r.push(Array(flairs[x]["text"], d, x, flairs[x]["num_posts"], flairs[x]["last_post"], flairs[x]["first_post"]));
		}
	}
	r.sort(function(a, b) { return a[1] < b[1] ? 1 : (a[1] > b[1] ? -1 : 0); });

	var s = "<table><tr><td>similarity</td><td>flair text</td><td>user</td><td>last /r/buffy post</td></tr>";
	for (x in r) {
		s += "<tr style='background:#" + get_color(r[x][1], 0.3) + "'><td>" + (r[x][1]*100).toFixed(0) + " %</td><td>" + r[x][0] + "</td><td><a href='http://reddit.com/user/" + r[x][2] + "'>" + r[x][2] + "</a></td>";
		if (r[x][3] === 0) {
			s += "<td style='background:#99f'>none found in the last 1000 comments";
		} else if (r[x][3] === -1) {
			s += "<td style='background:#99f'>error checking comments";
		} else {
	  		s += "<td style='background:#" + get_color(elapsed(r[x][4]) / 7776000, 0.6) + "'>" + nowago(r[x][4]) + " ago (" + r[x][3] + " over the last " + nowago(r[x][5]) + ")";
		}
		s += "</td></tr>";
	}
	s += "</table>";
	out.innerHTML = s;
}