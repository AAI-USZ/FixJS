function() {
	this.date= new Item("talk_date_string",
			    "Time|Date\\s*(?:& Time|)|日時|日程",
			    "(.*)", "");
	this.venue= new Item("talk_venue_name",
			     "Place|Venue|@|場所|会場",
			     "(.*)",", ");
	this.abst= new Item("talk_abstract",
			    "Abstract|(?:講演|セミナー|)(?:アブストラクト|概要|要旨)(?:.*[Aa]bstract[^"+del+"]|)",
			    "(.*)");
	this.speaker= new Item("talk_name_of_speaker",
			       "Speaker|(?:発表者|講演者|スピーカー|講師)(?:.*[Ss]peaker[^"+del+"]|)",
			       "(.*)",", ");
	this.supervisor= new Item("talk_name_of_speaker",
				  "指導教員","(.*)",", ");
	this.title= new Item("talk_title",
			     "Title|(?:講演|セミナー|)(?:題目|タイトル|演題)(?:.*[Tt]itle[^"+del+"]|)",
			     "(.*)", " ");

	this.date.show = function(index) {
	    var str = this.strArray.join("");
	    var re = new RegExp("(?:((?:平成\\s*|)[０-９\\d]+)\\s*[年/／]\\s*|)([０-９\\d]+)\\s*[月/／]\\s*([０-９\\d]+)\\s*(?:日|)(?:[^０-９\\d午前後]*\\s*((?:午前|午後|)\\s*[０-９\\d]+)\\s*[時:：](?:\\s*([０-９\\d]+)(?:分|)|)|)(?:\\s*(?:[-－ー〜～~]+|から)\\s*|)(?:((?:午前|午後|)[０-９\\d]+)\\s*[時:：](?:\\s*([０-９\\d]+)(?:分|)|)|)");
	    var hour24 = function(str) {
		if( typeof( str ) != "string" ) { return str; }
		str=str.strip();
		if (str.substring(0,2)=="午前") {
		    str = str.substring(2,str.length);
		}
		else if (str.substring(0,2)=="午後") {
		    str = String(12+parseInt(str.substring(2,str.length)));
		}
		return str;
	    };
	    var yearWestern = function(str) {
		if( typeof( str ) != "string" ) { return str; }
		str=str.strip();
		if (str.substring(0,2)=="平成") {
		    str = String(1988+parseInt(str.substring(2,str.length)));
		}
		return str;
	    };

	    var match = str.match(re);
	    if (match) {
		var d=new Date();
		var year=yearWestern(match[1] || d.getFullYear());
		this.show_str(index,normalizeNumber(year)+"/"
			      +normalizeNumber(match[2])+"/"
			      +normalizeNumber(match[3]));
		$("#talk_start_time_string"+index).val(normalizeNumber(hour24(match[4]))+":"+normalizeNumber(match[5]||"00"));
		$("#talk_end_time_string"+index).val(normalizeNumber(hour24(match[6]))+":"+normalizeNumber(match[7]||"00"));
	    }
	};

	this.title.show = function(index) {
	    if (this.strArray.length>0) {
		var str=this.strArray.join(this.joiner).strip();
		str=str.replace(/^["“]|["”]$/g, '');
		this.show_str(index,str);
	    }
	};
	// アブスト中に日本語の中に半角スペースを入れない
	this.abst.show = function(index) {
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
		this.show_str(index,out);

	    }
	};

	// 数理輪講のため
	this.supervisor.show = function(index) {
	    if (this.strArray.length>0) {
		this.show_str(index, $("#"+this.id+index).val()+"　（指導教員："+this.strArray.join(this.joiner)+"）");
	    }
	};

    }