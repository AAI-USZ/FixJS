function(box, Talk) {
    var talk = new Talk();

    var textArray = box.val().split("\n");
    var currentKey = "";
    var talks = new Array();
    for (var i=0; i<textArray.length; i++) {
	var hit=false;
	for (var key in talk) {
	    var tmp=talk[key].parse_line(textArray[i]);
	    if (tmp) {
		if (typeof(tmp)=="object") {
		    var talk_old=talk;
		    talks.push(talk_old);
		    talk = new Talk();
		    talk[key]=tmp;
		    talk.date.set_default(talk_old.date);
		    talk.venue.set_default(talk_old.venue);
		    talk.speaker.set_default(talk_old.speaker);
		}
		currentKey = key;
		hit=true;
		break;
	    }
	}
	if (!hit & textArray[i].length>0 && currentKey.length>0) {
		    talk[currentKey].insert_line(textArray[i]);
	}
    }
    talks.push(talk);

    $('#box').empty()
    for (var i=0; i<talks.length; i++) {
	append_empty_form('#box',i);
	for (var key in talks[i]) {
	    talks[i][key].show(i);
	}
    }
    }