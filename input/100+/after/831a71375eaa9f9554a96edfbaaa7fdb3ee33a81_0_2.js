function(obj, index, normalizeNumber, hour24, yearWestern) {
	    var str = obj.strArray.join("");
	    var re = new RegExp("(?:((?:平成\\s*|)[０-９\\d]+)\\s*[年/／]\\s*|)([０-９\\d]+)\\s*[月/／]\\s*([０-９\\d]+)\\s*(?:日|)(?:[^０-９\\d午前後]*\\s*((?:午前|午後|)\\s*[０-９\\d]+)\\s*[時:：](?:\\s*([０-９\\d]+)(?:分|)|)|)(?:\\s*(?:[-－ー〜～~]+|から)\\s*|)(?:((?:午前|午後|)[０-９\\d]+)\\s*[時:：](?:\\s*([０-９\\d]+)(?:分|)|)|)");
	    var match = str.match(re);
	    if (match) {
		var d=new Date();
		var year=yearWestern(match[1] || d.getFullYear());
		obj.show_str(index,normalizeNumber(year)+"/"
			      +normalizeNumber(match[2])+"/"
			      +normalizeNumber(match[3]));
		$("#talk_start_time_string"+index).val(normalizeNumber(hour24(match[4]))+":"+normalizeNumber(match[5]||"00"));
		$("#talk_end_time_string"+index).val(normalizeNumber(hour24(match[6]))+":"+normalizeNumber(match[7]||"00"));
	    }
	    }