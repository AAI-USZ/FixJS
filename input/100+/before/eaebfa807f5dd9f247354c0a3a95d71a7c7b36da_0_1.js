function parse_smart_form(box) {
    var styles = { date: new Style("talk_date_string",
				   "Time|Date\\s*(?:& Time|)|日時|日程",
				   "(.*)", ""),
		   venue: new Style("talk_venue_name",
				    "Place|Venue|@|場所",
				    "(.*)"),
		   abst: new Style("talk_abstract",
				   "Abstract|(?:アブストラクト|概要|要旨)(?:.*[Aa]bstract[^"+del+"]|)",
				   "(.*)"),
		   speaker: new Style("talk_name_of_speaker",
				      "Speaker|(?:発表者|講演者|スピーカー)(?:.*[Ss]peaker[^"+del+"]|)",
				      "(.*)",", "),
		   supervisor: new Style("talk_name_of_speaker",
					 "指導教員","(.*)",", "),
		   title: new Style("talk_title",
				    "Title|(?:(?:講演|)(?:題目|タイトル)|演題)(?:.*[Tt]itle[^"+del+"]|)",
				    "(?:\"|)((?:[^\"]|\"(?!$))*)(?:\"$|)", " ")};

    styles.date.show = function() {
	var str = this.strArray.join("");
	var re = new RegExp("(?:([０-９\\d]+)\\s*[年/／]\\s*|)([０-９\\d]+)\\s*[月/／]\\s*([０-９\\d]+)\\s*(?:日|)(?:[^０-９\\d]*\\s*([０-９\\d]+)\\s*[時:：](?:\\s*([０-９\\d]+)(?:分|)|)|)(?:\\s*[-ー〜～~]\\s*|)(?:([０-９\\d]+)\\s*[時:：](?:\\s*([０-９\\d]+)(?:分|)|)|)");
	var match = str.match(re);
	if (match) {
	    var d=new Date();
	    var year=match[1] || d.getFullYear();
	    $("#"+this.id).val(normalizeNumber(year)+"/"
		+normalizeNumber(match[2])+"/"
		+normalizeNumber(match[3]));
	    $("#talk_start_time_string").val(normalizeNumber(match[4])+":"+normalizeNumber(match[5]));
	    $("#talk_end_time_string").val(normalizeNumber(match[6])+":"+normalizeNumber(match[7]));
	}
    };

    // アブスト中に日本語の中に半角スペースを入れない
    styles.abst.show = function() {
	if (this.strArray.length>0) {
	    var out="";
	    var isDoubleByteAt = function(str, i) {
		return (str.charCodeAt(i)>255);
	    };
	    for (var i=0; i<this.strArray.length; i++) {
		if (out.length>0) {
		    if (isDoubleByteAt(out,out.length-1) && isDoubleByteAt(this.strArray[i],0)) {
			out+=this.strArray[i];
		    }
		    else {
			out+=" "+this.strArray[i];
		    }
		}
		else {
		    out=this.strArray[i];
		}
	    }
	    $("#"+this.id).val(out);

	}
    };

    // 数理輪講のため
    styles.supervisor.show = function() {
	if (this.strArray.length>0) {
	    $("#"+this.id).val($("#"+this.id).val()+"　（指導教員："+this.strArray.join(this.joiner)+"）");
	}
    };


    var textArray = box.val().split("\n");
    var currentKey = "";
    for (var i=0; i<textArray.length; i++) {
	var hit=false;
	for (var key in styles) {
	    if (styles[key].parse_line(textArray[i])) {
		currentKey = key;
		hit=true;
		break;
	    }
	}
	if (!hit & textArray[i].length>0 && currentKey.length>0) {
		    styles[currentKey].strArray.push(textArray[i]);
	}
    }
    for (var key in styles) {
	styles[key].show();
    }
}